import { randomUUID } from 'node:crypto';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyStatic from '@fastify/static';
import winston from 'winston';
import Config from '../Config.js';
import { Broker } from '../Broker/index.js';
import { Db } from '../Db/index.js';
import { NotFoundError } from '../errors.js';
import { AppParams, CreateReportBody, IdParams } from './types.js';
import { createReportBody } from './requestSchemas.js';
import {
  createReportSchema,
  getClientsSchema,
  getClientByIdSchema,
  getClientReportsSchema,
} from './schemas.js';

class App {
  logger: winston.Logger;
  server: FastifyInstance;
  config: Config;
  broker: Broker;
  db: Db;

  constructor(params: AppParams) {
    this.logger = params.logger.child({ label: 'App' });
    this.logger.info('init app');
    this.config = params.config;
    this.server = params.server.getServer();
    this.broker = params.broker;
    this.db = params.db;

    this.createReport = this.createReport.bind(this);
    this.getClients = this.getClients.bind(this);
    this.getClientById = this.getClientById.bind(this);
    this.getClientReports = this.getClientReports.bind(this);
  }

  initRoutes() {
    this.server.post(
      '/reports',
      { schema: createReportSchema },
      this.createReport,
    );
    this.server.get('/clients', { schema: getClientsSchema }, this.getClients);
    this.server.get(
      '/clients/:id',
      { schema: getClientByIdSchema },
      this.getClientById,
    );
    this.server.get(
      '/clients/:id/reports',
      { schema: getClientReportsSchema },
      this.getClientReports,
    );
  }

  async registerStaticArtifacts() {
    await this.server.register(fastifyStatic, {
      root: this.config.artifactsDir,
      prefix: '/artifacts/',
      decorateReply: false,
    });
  }

  async getClients(_request: FastifyRequest, reply: FastifyReply) {
    const clients = await this.db.selectAllClients();
    reply.send(clients);
  }

  async getClientById(
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) {
    const client = await this.db.selectClientById(request.params.id);
    if (!client) {
      throw new NotFoundError('Client not found');
    }
    reply.send(client);
  }

  async getClientReports(
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) {
    const client = await this.db.selectClientById(request.params.id);
    if (!client) {
      throw new NotFoundError('Client not found');
    }
    const reports = await this.db.selectReportsByClientId(request.params.id);
    reply.send(reports);
  }

  async createReport(
    request: FastifyRequest<{ Body: CreateReportBody }>,
    reply: FastifyReply,
  ) {
    const body = createReportBody.parse(request.body);
    const { type } = body;
    const clientId = type === 'cosmofit' ? body.clientId : undefined;
    const runId = randomUUID();

    this.logger.info(
      `create report run=${runId} type=${type} clientId=${clientId ?? '-'}`,
    );

    await this.db.insertClientReport({ id: runId, type, clientId });
    await this.broker.publish(`report.${type}.validate`, {
      runId,
      type,
      clientId,
    });

    reply.code(202).send({ runId, status: 'pending' });
  }
}

export default App;

import { reportTypes } from '../reportTypes.js';

const clientSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
  },
};

const clientReportSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    type: { type: 'string' },
    status: { type: 'string' },
    result_url: { type: ['string', 'null'] },
    error: { type: ['string', 'null'] },
    created_at: { type: 'string', format: 'date-time' },
    finished_at: { type: ['string', 'null'], format: 'date-time' },
  },
};

const idParamSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'integer' },
  },
};

const notFoundSchema = {
  type: 'object',
  properties: { error: { type: 'string' } },
};

export const createReportSchema = {
  body: {
    type: 'object',
    required: ['type'],
    properties: {
      type: { type: 'string', enum: reportTypes },
      clientId: { type: 'integer' },
    },
  },
  response: {
    202: {
      type: 'object',
      properties: {
        runId: { type: 'string' },
        status: { type: 'string' },
      },
    },
  },
};

export const getClientsSchema = {
  response: {
    200: { type: 'array', items: clientSchema },
  },
};

export const getClientByIdSchema = {
  params: idParamSchema,
  response: {
    200: clientSchema,
    404: notFoundSchema,
  },
};

export const getClientReportsSchema = {
  params: idParamSchema,
  response: {
    200: { type: 'array', items: clientReportSchema },
  },
};

const reportTypeDescriptorSchema = {
  type: 'object',
  properties: {
    type: { type: 'string' },
    label: { type: 'string' },
    format: { type: 'string' },
    requiresClient: { type: 'boolean' },
    description: { type: 'string' },
  },
};

export const getReportTypesSchema = {
  response: {
    200: { type: 'array', items: reportTypeDescriptorSchema },
  },
};

const reportListItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    type: { type: 'string' },
    client_id: { type: ['integer', 'null'] },
    client_name: { type: ['string', 'null'] },
    status: { type: 'string' },
    result_url: { type: ['string', 'null'] },
    error: { type: ['string', 'null'] },
    created_at: { type: 'string', format: 'date-time' },
    finished_at: { type: ['string', 'null'], format: 'date-time' },
  },
};

export const getAllReportsSchema = {
  response: {
    200: { type: 'array', items: reportListItemSchema },
  },
};

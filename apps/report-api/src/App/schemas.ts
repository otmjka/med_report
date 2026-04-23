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
    oneOf: [
      {
        type: 'object',
        required: ['type', 'clientId'],
        additionalProperties: false,
        properties: {
          type: { type: 'string', const: 'cosmofit' },
          clientId: { type: 'integer' },
        },
      },
      {
        type: 'object',
        required: ['type'],
        additionalProperties: false,
        properties: {
          type: { type: 'string', const: 'clients-summary' },
        },
      },
    ],
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

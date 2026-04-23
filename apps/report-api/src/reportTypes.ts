export const reportTypes = ['cosmofit', 'clients-summary'] as const;

export type ReportType = (typeof reportTypes)[number];

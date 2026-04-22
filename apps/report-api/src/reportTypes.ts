export const reportTypes = ['cosmofit'] as const;

export type ReportType = (typeof reportTypes)[number];

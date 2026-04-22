export const setReportRunning = `
  UPDATE client_reports
  SET status = 'running'
  WHERE id = $1
`;

export const setReportDone = `
  UPDATE client_reports
  SET status = 'done',
      result_url = $2,
      finished_at = NOW()
  WHERE id = $1
`;

export const setReportFailed = `
  UPDATE client_reports
  SET status = 'failed',
      error = $2,
      finished_at = NOW()
  WHERE id = $1
`;

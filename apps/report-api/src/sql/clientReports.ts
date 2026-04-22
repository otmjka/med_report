export const insertClientReport = `
  INSERT INTO client_reports (id, type, client_id, status)
  VALUES ($1, $2, $3, 'pending')
`;

export const selectReportsByClientId = `
  SELECT id, type, status, result_url, error, created_at, finished_at
  FROM client_reports
  WHERE client_id = $1
  ORDER BY created_at DESC
`;

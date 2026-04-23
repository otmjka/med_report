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

export const selectAllReports = `
  SELECT r.id, r.type, r.client_id, c.name AS client_name,
         r.status, r.result_url, r.error, r.created_at, r.finished_at
  FROM client_reports r
  LEFT JOIN clients c ON c.id = r.client_id
  ORDER BY r.created_at DESC
`;

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO clients (name) VALUES
    ('Иван Иванов'),
    ('Мария Петрова'),
    ('Алексей Сидоров');

CREATE TABLE client_reports (
    id UUID PRIMARY KEY,
    type TEXT NOT NULL,
    client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    result_url TEXT,
    error TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    finished_at TIMESTAMP
);

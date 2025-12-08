export const CLIENTS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT,
    owner_name TEXT,
    client_id TEXT,
    client_secret TEXT,
    username TEXT,
    password TEXT,
    primary_key TEXT,
    secondary_key TEXT,
    account_id TEXT,
    token_expires_at TEXT,
    auth_name TEXT,
    auth_url TEXT,
    resource_name TEXT,
    resource_url TEXT,
    ip_address TEXT
);
`;

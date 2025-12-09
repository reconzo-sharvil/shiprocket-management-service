export const PLATFORM_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS platforms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    resource_name TEXT UNIQUE,
    auth_name TEXT,
    auth_url TEXT,
    resource_url TEXT
);
`;
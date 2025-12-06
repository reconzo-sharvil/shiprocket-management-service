export const PLATFORM_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS platforms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_name TEXT,
    auth_name TEXT,
    auth_url TEXT,
    resource_name TEXT,
    resource_url TEXT
);
`;
export const CLIENT_PLATFORM_MAPPING_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS client_platform_mapping (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_name TEXT,
    resource_name TEXT,
    UNIQUE(owner_name, resource_name)
);
`;

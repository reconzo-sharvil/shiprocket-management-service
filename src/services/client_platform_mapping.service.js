import { dbRun, dbGet, dbAll } from "../middlewares/db.middleware.js";

const getMappingsByOwnerName = async (ownerName) => {
  const sql = "SELECT * FROM client_platform_mapping WHERE owner_name = ?";
  return await dbAll(sql, [ownerName]);
};

const addMapping = async (ownerName, resourceName) => {
  const sql = `
    INSERT INTO client_platform_mapping (owner_name, resource_name)
    VALUES (?, ?)
  `;
  const result = await dbRun(sql, [ownerName, resourceName]);
  return { id: result.lastID };
};

const deleteMapping = async (ownerName, resourceName) => {
  const sql =
    "DELETE FROM client_platform_mapping WHERE owner_name = ? AND resource_name = ?";
  const result = await dbRun(sql, [ownerName, resourceName]);
  return { changes: result.changes };
};

const checkMappingExists = async (ownerName, resourceName) => {
  const sql =
    "SELECT * FROM client_platform_mapping WHERE owner_name = ? AND resource_name = ?";
  const result = await dbGet(sql, [ownerName, resourceName]);
  return !!result;
};

export default {
  getMappingsByOwnerName,
  addMapping,
  deleteMapping,
  checkMappingExists,
};

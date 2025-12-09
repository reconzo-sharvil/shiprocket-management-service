import { dbAll, dbRun, dbGet } from "../middlewares/db.middleware.js";

const addPlatform = async (data) => {
  const sql = `
        INSERT INTO platforms (
             resource_name, auth_name, auth_url, resource_url
        ) VALUES (?, ?, ?, ?)
    `;

  const params = [
    data.resource_name,
    data.auth_name,
    data.auth_url,
    data.resource_url,
  ];

  const result = await dbRun(sql, params);
  return { id: result.lastID };
};

const getPlatforms = async () => {
  const sql = "SELECT * FROM platforms";
  return await dbAll(sql);
};

const getPlatformByResourceName = async (resourceName) => {
  const sql = `
        SELECT auth_name, auth_url, resource_name, resource_url 
        FROM platforms 
        WHERE resource_name = ?
    `;
  const result = await dbGet(sql, [resourceName]);
  return result || null;
};

const checkPlatformExists = async (resourceName) => {
  const sql = "SELECT * FROM platforms WHERE resource_name = ?";
  const result = await dbGet(sql, [resourceName]);
  return !!result;
};

const updatePlatform = async (resourceName, data) => {
  const fields = [];
  const params = [];

  if (data.resource_name !== undefined) {
    fields.push("resource_name = ?");
    params.push(data.resource_name);
  }
  if (data.auth_name !== undefined) {
    fields.push("auth_name = ?");
    params.push(data.auth_name);
  }
  if (data.auth_url !== undefined) {
    fields.push("auth_url = ?");
    params.push(data.auth_url);
  }
  if (data.resource_url !== undefined) {
    fields.push("resource_url = ?");
    params.push(data.resource_url);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  params.push(resourceName);
  const sql = `UPDATE platforms SET ${fields.join(
    ", "
  )} WHERE resource_name = ?`;

  const result = await dbRun(sql, params);
  return { changes: result.changes };
};

const deletePlatform = async (resourceName) => {
  const sql = "DELETE FROM platforms WHERE resource_name = ?";
  const result = await dbRun(sql, [resourceName]);
  return { changes: result.changes };
};

export default {
  addPlatform,
  getPlatforms,
  getPlatformByResourceName,
  checkPlatformExists,
  updatePlatform,
  deletePlatform,
};

import { dbAll, dbRun, dbGet } from "../middlewares/db.middleware.js";

const addPlatform = async (data) => {
  const sql = `
        INSERT INTO platforms (
             owner_name, auth_name, auth_url, resource_name, resource_url
        ) VALUES (?, ?, ?, ?, ?)
    `;

  const params = [
    data.owner_name,
    data.auth_name,
    data.auth_url,
    data.resource_name,
    data.resource_url,
  ];

  const result = await dbRun(sql, params);
  return { id: result.lastID };
};

const getPlatforms = async () => {
  const sql = "SELECT * FROM platforms";
  return await dbAll(sql);
};

const getPlatformByName = async (platformName) => {
  const sql = `
        SELECT auth_name, auth_url, resource_name, resource_url 
        FROM platforms 
        WHERE owner_name = ?
    `;
  const result = await dbGet(sql, [platformName]);
  return result || null;
};

const updatePlatform = async (platformName, data) => {
  const fields = [];
  const params = [];

  if (data.owner_name !== undefined) {
    fields.push("owner_name = ?");
    params.push(data.owner_name);
  }
  if (data.auth_name !== undefined) {
    fields.push("auth_name = ?");
    params.push(data.auth_name);
  }
  if (data.auth_url !== undefined) {
    fields.push("auth_url = ?");
    params.push(data.auth_url);
  }
  if (data.resource_name !== undefined) {
    fields.push("resource_name = ?");
    params.push(data.resource_name);
  }
  if (data.resource_url !== undefined) {
    fields.push("resource_url = ?");
    params.push(data.resource_url);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  params.push(platformName);
  const sql = `UPDATE platforms SET ${fields.join(", ")} WHERE owner_name = ?`;

  const result = await dbRun(sql, params);
  return { changes: result.changes };
};

export default {
  addPlatform,
  getPlatforms,
  getPlatformByName,
  updatePlatform,
};

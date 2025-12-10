import { dbAll, dbRun, dbGet } from "../middlewares/db.middleware.js";

const DEFAULT_CLIENT_NAME = "reconzo";

const getClientByOwnerName = async (ownerName) => {
  const sql = "SELECT * FROM clients WHERE owner_name = ?";
  return await dbAll(sql, [ownerName]);
};

const checkClientExists = async (ownerName, resourceName) => {
  const sql =
    "SELECT * FROM clients WHERE owner_name = ? AND resource_name = ?";
  const result = await dbGet(sql, [ownerName, resourceName]);
  return !!result;
};

const addClient = async (data, platformDetails) => {
  const sql = `
    INSERT INTO clients (
      client_name, owner_name, client_id, client_secret, username,
      password, primary_key, secondary_key, account_id,
      token_expires_at, auth_name, auth_url, resource_name, resource_url,
      ip_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    DEFAULT_CLIENT_NAME,
    data.owner_name,
    data.client_id,
    data.client_secret,
    data.username,
    data.password,
    data.primary_key,
    data.secondary_key,
    data.account_id,
    data.token_expires_at,
    platformDetails ? platformDetails.auth_name : null,
    platformDetails ? platformDetails.auth_url : null,
    platformDetails ? platformDetails.resource_name : data.resource_name,
    platformDetails ? platformDetails.resource_url : null,
    data.ip_address,
  ];

  const result = await dbRun(sql, params);
  return { id: result.lastID };
};

const updateClient = async (ownerName, resourceName, data, platformDetails) => {
  const fields = [];
  const params = [];

  if (data.client_id !== undefined) {
    fields.push("client_id = ?");
    params.push(data.client_id);
  }
  if (data.client_secret !== undefined) {
    fields.push("client_secret = ?");
    params.push(data.client_secret);
  }
  if (data.username !== undefined) {
    fields.push("username = ?");
    params.push(data.username);
  }
  if (data.password !== undefined) {
    fields.push("password = ?");
    params.push(data.password);
  }
  if (data.primary_key !== undefined) {
    fields.push("primary_key = ?");
    params.push(data.primary_key);
  }
  if (data.secondary_key !== undefined) {
    fields.push("secondary_key = ?");
    params.push(data.secondary_key);
  }
  if (data.account_id !== undefined) {
    fields.push("account_id = ?");
    params.push(data.account_id);
  }
  if (data.token_expires_at !== undefined) {
    fields.push("token_expires_at = ?");
    params.push(data.token_expires_at);
  }
  if (data.ip_address !== undefined) {
    fields.push("ip_address = ?");
    params.push(data.ip_address);
  }

  if (platformDetails) {
    if (platformDetails.auth_name !== undefined) {
      fields.push("auth_name = ?");
      params.push(platformDetails.auth_name);
    }
    if (platformDetails.auth_url !== undefined) {
      fields.push("auth_url = ?");
      params.push(platformDetails.auth_url);
    }
    if (platformDetails.resource_name !== undefined) {
      fields.push("resource_name = ?");
      params.push(platformDetails.resource_name);
    }
    if (platformDetails.resource_url !== undefined) {
      fields.push("resource_url = ?");
      params.push(platformDetails.resource_url);
    }
  } else if (data.resource_name !== undefined) {
    fields.push("resource_name = ?");
    params.push(data.resource_name);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  params.push(ownerName);
  params.push(resourceName);
  const sql = `UPDATE clients SET ${fields.join(
    ", "
  )} WHERE owner_name = ? AND resource_name = ?`;

  const result = await dbRun(sql, params);
  return { changes: result.changes };
};

const deleteClient = async (ownerName, resourceName) => {
  const sql = "DELETE FROM clients WHERE owner_name = ? AND resource_name = ?";
  const result = await dbRun(sql, [ownerName, resourceName]);
  return { changes: result.changes };
};

const getClientFieldsStatus = async (ownerName) => {
  const statusSql = `
    SELECT resource_name, 
           1 as is_configured
    FROM clients
    WHERE owner_name = ?
  `;

  const mappingSql = `
    SELECT resource_name 
    FROM client_platform_mapping
    WHERE owner_name = ?
  `;

  const statusRows = await dbAll(statusSql, [ownerName]);
  const mappingRows = await dbAll(mappingSql, [ownerName]);

  const status = {};
  statusRows.forEach((row) => {
    status[row.resource_name] = true;
  });

  const resourcesMapped = {};
  mappingRows.forEach((row) => {
    resourcesMapped[row.resource_name] = true;
  });

  return {
    status,
    resourcesMapped,
  };
};

export default {
  getClientByOwnerName,
  checkClientExists,
  addClient,
  updateClient,
  deleteClient,
  getClientFieldsStatus,
};

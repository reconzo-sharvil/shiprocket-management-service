import { dbAll, dbRun, dbGet } from "../middlewares/db.middleware.js";

const getClientByName = async (clientName) => {
  const sql = "SELECT * FROM clients WHERE client_name = ?";
  return await dbAll(sql, [clientName]);
};

const addClient = async (data, platformDetails) => {
  const sql = `
        INSERT INTO clients (
            client_name, client_id, client_secret, owner_name, username,
            password, primary_key, secondary_key, account_id,
            token_expires_at, auth_name, auth_url, resource_name, resource_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const params = [
    data.client_name,
    data.client_id,
    data.client_secret,
    data.owner_name,
    data.username,
    data.password,
    data.primary_key,
    data.secondary_key,
    data.account_id,
    data.token_expires_at,
    platformDetails ? platformDetails.auth_name : null,
    platformDetails ? platformDetails.auth_url : null,
    platformDetails ? platformDetails.resource_name : null,
    platformDetails ? platformDetails.resource_url : null,
  ];

  const result = await dbRun(sql, params);
  return { id: result.lastID };
};

const updateClient = async (clientName, data, platformDetails) => {
  const fields = [];
  const params = [];

  // Dynamically build update query based on provided fields
  if (data.client_id !== undefined) {
    fields.push("client_id = ?");
    params.push(data.client_id);
  }
  if (data.client_secret !== undefined) {
    fields.push("client_secret = ?");
    params.push(data.client_secret);
  }
  if (data.owner_name !== undefined) {
    fields.push("owner_name = ?");
    params.push(data.owner_name);
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

  // Update platform details if provided
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
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  params.push(clientName);
  const sql = `UPDATE clients SET ${fields.join(", ")} WHERE client_name = ?`;

  const result = await dbRun(sql, params);
  return { changes: result.changes };
};

const getClientFieldsStatus = async (clientName) => {
  const sql = "SELECT * FROM clients WHERE client_name = ?";
  const client = await dbGet(sql, [clientName]);

  if (!client) {
    throw new Error(`Client '${clientName}' not found`);
  }

  return {
    [clientName]: !!(client.owner_name && client.owner_name.trim() !== ""),
  };
};

export default {
  getClientByName,
  addClient,
  updateClient,
  getClientFieldsStatus,
};

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

const getClientFieldsStatus = async (clientName) => {
  const sql = "SELECT * FROM clients WHERE client_name = ?";
  const client = await dbGet(sql, [clientName]);

  if (!client) {
    throw new Error(`Client '${clientName}' not found`);
  }

  return {
    [clientName]: !!(client.owner_name && client.owner_name.trim() !== "")
  };
};

export default {
  getClientByName,
  addClient,
  getClientFieldsStatus,
};

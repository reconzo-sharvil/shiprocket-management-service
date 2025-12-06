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
        platformDetails.auth_name,
        platformDetails.auth_url,
        platformDetails.resource_name,
        platformDetails.resource_url
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

    const fields = [
        'client_id', 'client_secret', 'owner_name', 'username',
        'password', 'primary_key', 'secondary_key', 'account_id',
        'token_expires_at', 'auth_name', 'auth_url', 'resource_name', 'resource_url'
    ];

    const filledFields = [];
    const emptyFields = [];

    fields.forEach(field => {
        if (client[field] && client[field].trim() !== '') {
            filledFields.push(field);
        } else {
            emptyFields.push(field);
        }
    });

    return {
        client_name: clientName,
        platform_name: client.platform_name,
        total_fields: fields.length,
        filled_count: filledFields.length,
        empty_count: emptyFields.length,
        filled_fields: filledFields,
        empty_fields: emptyFields
    };
};

export default {
    getClientByName,
    addClient,
    getClientFieldsStatus
};
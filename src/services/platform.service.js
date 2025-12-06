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
        data.resource_url
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

export default {
    addPlatform,
    getPlatforms,
    getPlatformByName
};
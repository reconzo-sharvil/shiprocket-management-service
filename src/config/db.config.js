import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { CLIENTS_TABLE_SQL } from "../schema/clients.schema.js";
import { PLATFORM_TABLE_SQL } from "../schema/platform.schema.js";
import { CLIENT_PLATFORM_MAPPING_TABLE_SQL } from "../schema/client_platform_mapping.schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "../../db/database.sqlite");

const db = new Database(DB_PATH);

db.exec(PLATFORM_TABLE_SQL);
db.exec(CLIENTS_TABLE_SQL);
db.exec(CLIENT_PLATFORM_MAPPING_TABLE_SQL);

console.log("Connected to SQLite using better-sqlite3");

export default db;

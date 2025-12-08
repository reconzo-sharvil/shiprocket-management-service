import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { CLIENTS_TABLE_SQL } from "../schema/clients.schema.js";
import { PLATFORM_TABLE_SQL } from "../schema/platform.schema.js";

sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "../../db/database.sqlite");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("DB Error:", err.message);
  } else {
    console.log("Connected to SQLite DB");
  }
});

db.run(PLATFORM_TABLE_SQL);
db.run(CLIENTS_TABLE_SQL);

export default db;

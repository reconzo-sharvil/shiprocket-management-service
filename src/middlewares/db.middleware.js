import db from "../config/db.config.js";

export const dbAll = (sql, params = []) => {
  const stmt = db.prepare(sql);
  return stmt.all(...params);
};

export const dbRun = (sql, params = []) => {
  const stmt = db.prepare(sql);
  const info = stmt.run(...params);
  return { lastID: info.lastInsertRowid, changes: info.changes };
};

export const dbGet = (sql, params = []) => {
  const stmt = db.prepare(sql);
  return stmt.get(...params);
};

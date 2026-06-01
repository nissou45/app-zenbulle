const db = require("../config/db");

exports.countAll = async () => {
  const [[{ totalJournals }]] = await db.query(
    "SELECT COUNT(*) as totalJournals FROM journal_entries",
  );
  return totalJournals;
};

exports.getAllByUser = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM journal_entries WHERE utilisateur_id = ? ORDER BY created_at DESC",
    [userId],
  );
  return rows;
};

exports.create = async (userId, content) => {
  await db.query(
    "INSERT INTO journal_entries (utilisateur_id, date, content, created_at) VALUES (?, NOW(), ?, NOW())",
    [userId, content],
  );
};

exports.update = async (id, userId, content) => {
  await db.query(
    "UPDATE journal_entries SET content = ? WHERE id = ? AND utilisateur_id = ?",
    [content, id, userId],
  );
};

exports.delete = async (id, userId) => {
  await db.query(
    "DELETE FROM journal_entries WHERE id = ? AND utilisateur_id = ?",
    [id, userId],
  );
};

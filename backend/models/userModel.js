const db = require("../config/db");

exports.findByEmail = async (email) => {
  const sql = "SELECT * FROM utilisateurs WHERE email = ?";
  const [rows] = await db.query(sql, [email]);
  return rows;
};

exports.findByPseudo = async (pseudo) => {
  const sql = "SELECT * FROM utilisateurs WHERE pseudo = ?";
  const [rows] = await db.query(sql, [pseudo]);
  return rows;
};

exports.create = async (user) => {
  const sql =
    "INSERT INTO utilisateurs (email, password_hash, pseudo) VALUES (?, ?, ?)";
  const [result] = await db.query(sql, [
    user.email,
    user.password_hash,
    user.pseudo,
  ]);
  return result.insertId;
};

exports.getAll = async () => {
  const [rows] = await db.query(
    "SELECT id, pseudo, email, role, created_at FROM utilisateurs",
  );
  return rows;
};

exports.updateRole = async (id, role) => {
  await db.query("UPDATE utilisateurs SET role = ? WHERE id = ?", [role, id]);
};

exports.deleteById = async (id) => {
  await db.query("DELETE FROM utilisateurs WHERE id = ?", [id]);
};

exports.count = async () => {
  const [[{ totalUsers }]] = await db.query(
    "SELECT COUNT(*) as totalUsers FROM utilisateurs",
  );
  return totalUsers;
};

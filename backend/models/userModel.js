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

const db = require("../config/db");

exports.findByEmail = (email, callback) => {
  const sql = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(sql, [email], callback);
};

exports.create = (user, callback) => {
  const sql =
    "INSERT INTO utilisateurs (email, password_hash, pseudo) VALUES (?, ?, ?)";
  db.query(
    sql,
    [user.email, user.password_hash, user.pseudo],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    },
  );
};

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 100,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

db.getConnection()
  .then((conn) => {
    console.log("✅ MySQL connecté");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ MySQL :", err.message);
    process.exit(1);
  });

module.exports = db;

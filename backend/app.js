require("dotenv").config();
const db = require("./config/db");

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

// Middlewares de base
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Store
const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
}, db);

// Session
app.use(
  session({
    key: "zenbulle_sid",
    secret: process.env.SESSION_SECRET || "zenbulle-secret-key-123",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 1 jour
    },
  }),
);

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/journalRoutes"));
app.use("/api", require("./routes/moodsRoutes"));
app.use("/api", require("./routes/citationsRoutes"));
app.use("/api", require("./routes/exercicesRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});

// Gestion d'erreurs globale
app.use((err, req, res, next) => {
  console.error("ERREUR SERVEUR:", err.stack);
  res.status(500).json({
    message: "Une erreur interne est survenue",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Lancement serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ZenBulle sur http://localhost:${PORT}`);
});

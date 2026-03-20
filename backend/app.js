require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);
const journalRoutes = require("./routes/journalRoutes");
app.use("/api", journalRoutes);

// Lancement serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ZenBulle sur http://localhost:${PORT}`);
});

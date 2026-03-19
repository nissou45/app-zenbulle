require("dotenv").config();

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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "ZenBulle API 🫧" });
});

// Lancement serveur
app.listen(3000, () => {
  console.log("✅ ZenBulle sur http://localhost:3000");
});

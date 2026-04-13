const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middlewares/auth");

// GET tous les exercices de respiration
router.get("/exercices", auth, (req, res) => {
  db.query("SELECT * FROM exercices", (err, rows) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json(rows);
  });
});

module.exports = router;

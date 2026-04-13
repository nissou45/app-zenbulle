const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middlewares/auth");

// GET toutes les entrées
router.get("/journal", auth, (req, res) => {
  const userId = req.session.user.id;
  db.query(
    "SELECT * FROM journal_entries WHERE utilisateur_id = ? ORDER BY created_at DESC",
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });
      res.json(rows);
    },
  );
});

// POST nouvelle entrée
router.post("/journal", auth, (req, res) => {
  const userId = req.session.user.id;
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Contenu manquant" });
  }
  db.query(
    "INSERT INTO journal_entries (utilisateur_id, date, content, created_at) VALUES (?, NOW(), ?, NOW())",
    [userId, content],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });
      res.json({ ok: true });
    },
  );
});

// PUT modifier une entrée
router.put("/journal/:id", auth, (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Contenu manquant" });
  }
  db.query(
    "UPDATE journal_entries SET content = ? WHERE id = ? AND utilisateur_id = ?",
    [content, id, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });
      res.json({ ok: true });
    },
  );
});

// DELETE supprimer une entrée
router.delete("/journal/:id", auth, (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  db.query(
    "DELETE FROM journal_entries WHERE id = ? AND utilisateur_id = ?",
    [id, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });
      res.json({ ok: true });
    },
  );
});

module.exports = router;

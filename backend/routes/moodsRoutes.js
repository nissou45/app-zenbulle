const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middlewares/auth");

// POST enregistrer une humeur
router.post("/moods", auth, (req, res) => {
  const userId = req.session.user.id;
  const { mood } = req.body;

  db.query("SELECT id FROM moods WHERE label = ?", [mood], (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows.length)
      return res.status(404).json({ message: "Humeur introuvable" });

    const moodId = rows[0].id;
    db.query(
      "INSERT INTO daily_moods (utilisateur_id, mood_id, date) VALUES (?, ?, NOW())",
      [userId, moodId],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ ok: true });
      },
    );
  });
});

// GET humeurs de l'utilisateur
router.get("/moods", auth, (req, res) => {
  const userId = req.session.user.id;
  db.query(
    `SELECT dm.id, m.label, dm.date 
     FROM daily_moods dm
     JOIN moods m ON dm.mood_id = m.id
     WHERE dm.utilisateur_id = ?
     ORDER BY dm.date DESC`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    },
  );
});

module.exports = router;

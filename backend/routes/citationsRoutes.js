const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middlewares/auth");

// GET citation selon l'humeur
router.get("/citations", auth, (req, res) => {
  const { mood } = req.query;

  if (mood) {
    db.query(
      "SELECT * FROM citations WHERE mood = ? ORDER BY RAND() LIMIT 1",
      [mood],
      (err, rows) => {
        if (err) return res.status(500).json(err);
        if (!rows.length)
          return res.status(404).json({ message: "Aucune citation trouvée" });
        res.json(rows[0]);
      },
    );
  } else {
    db.query("SELECT * FROM citations ORDER BY RAND() LIMIT 1", (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows[0]);
    });
  }
});

module.exports = router;

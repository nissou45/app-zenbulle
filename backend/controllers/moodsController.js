const db = require("../config/db");

exports.saveMood = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const { mood } = req.body;

    const [rows] = await db.query("SELECT id FROM moods WHERE label = ?", [
      mood,
    ]);
    if (!rows.length) {
      return res.status(404).json({ message: "Humeur introuvable" });
    }

    const moodId = rows[0].id;
    await db.query(
      "INSERT INTO daily_moods (utilisateur_id, mood_id, date) VALUES (?, ?, NOW())",
      [userId, moodId],
    );
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.getUserMoods = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const [rows] = await db.query(
      `SELECT dm.id, m.label, dm.date 
       FROM daily_moods dm
       JOIN moods m ON dm.mood_id = m.id
       WHERE dm.utilisateur_id = ?
       ORDER BY dm.date DESC`,
      [userId],
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

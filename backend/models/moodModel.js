const db = require("../config/db");

exports.findByLabel = async (label) => {
  const [rows] = await db.query("SELECT id FROM moods WHERE label = ?", [label]);
  return rows;
};

exports.save = async (userId, moodId) => {
  await db.query(
    "INSERT INTO daily_moods (utilisateur_id, mood_id, date) VALUES (?, ?, NOW())",
    [userId, moodId],
  );
};

exports.countAll = async () => {
  const [[{ totalMoods }]] = await db.query(
    "SELECT COUNT(*) as totalMoods FROM daily_moods",
  );
  return totalMoods;
};

exports.getStats = async () => {
  const [rows] = await db.query(
    "SELECT label, COUNT(*) as count FROM daily_moods dm JOIN moods m ON dm.mood_id = m.id GROUP BY label",
  );
  return rows;
};

exports.getByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT dm.id, m.label, dm.date
     FROM daily_moods dm
     JOIN moods m ON dm.mood_id = m.id
     WHERE dm.utilisateur_id = ?
     ORDER BY dm.date DESC`,
    [userId],
  );
  return rows;
};

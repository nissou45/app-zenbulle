const db = require("../config/db");

exports.getRandomByMood = async (mood) => {
  const [rows] = await db.query(
    "SELECT text FROM citations WHERE mood = ? ORDER BY RAND() LIMIT 1",
    [mood],
  );
  return rows;
};

exports.getAll = async () => {
  const [rows] = await db.query("SELECT * FROM citations");
  return rows;
};

exports.create = async (mood, text) => {
  await db.query("INSERT INTO citations (mood, text) VALUES (?, ?)", [
    mood,
    text,
  ]);
};

exports.update = async (id, mood, text) => {
  await db.query("UPDATE citations SET mood = ?, text = ? WHERE id = ?", [
    mood,
    text,
    id,
  ]);
};

exports.deleteById = async (id) => {
  await db.query("DELETE FROM citations WHERE id = ?", [id]);
};

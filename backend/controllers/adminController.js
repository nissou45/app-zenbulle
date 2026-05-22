const db = require("../config/db");
const ROLES = require("../constants/roles");

exports.getStats = async (req, res, next) => {
  try {
    const [[{ totalUsers }]] = await db.query(
      "SELECT COUNT(*) as totalUsers FROM utilisateurs",
    );
    const [[{ totalMoods }]] = await db.query(
      "SELECT COUNT(*) as totalMoods FROM daily_moods",
    );
    const [[{ totalJournals }]] = await db.query(
      "SELECT COUNT(*) as totalJournals FROM journal_entries",
    );

    const [moods] = await db.query(
      "SELECT label, COUNT(*) as count FROM daily_moods dm JOIN moods m ON dm.mood_id = m.id GROUP BY label",
    );
    const moodStats = {};
    moods.forEach((m) => (moodStats[m.label] = m.count));

    res.json({ totalUsers, totalMoods, totalJournals, moodStats });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const [users] = await db.query(
      "SELECT id, pseudo, email, role, created_at FROM utilisateurs",
    );
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (![ROLES.USER, ROLES.ADMIN].includes(role))
      return res.status(400).json({ message: "Rôle invalide" });

    if (parseInt(req.params.id) === req.session.user.id)
      return res
        .status(400)
        .json({ message: "Impossible de modifier son propre rôle" });

    await db.query("UPDATE utilisateurs SET role = ? WHERE id = ?", [
      role,
      req.params.id,
    ]);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (parseInt(req.params.id) === req.session.user.id)
      return res
        .status(400)
        .json({ message: "Impossible de se supprimer soi-même" });

    await db.query("DELETE FROM utilisateurs WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.getCitations = async (req, res, next) => {
  try {
    const [citations] = await db.query("SELECT * FROM citations");
    res.json(citations);
  } catch (err) {
    next(err);
  }
};

exports.createCitation = async (req, res, next) => {
  try {
    const { mood, text } = req.body;
    await db.query("INSERT INTO citations (mood, text) VALUES (?, ?)", [
      mood,
      text,
    ]);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.updateCitation = async (req, res, next) => {
  try {
    const { mood, text } = req.body;
    if (!mood || !text)
      return res.status(400).json({ message: "Champs manquants" });

    await db.query("UPDATE citations SET mood = ?, text = ? WHERE id = ?", [
      mood,
      text,
      req.params.id,
    ]);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteCitation = async (req, res, next) => {
  try {
    await db.query("DELETE FROM citations WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

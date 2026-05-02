const db = require("../config/db");

exports.getAllEntries = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const [rows] = await db.query(
      "SELECT * FROM journal_entries WHERE utilisateur_id = ? ORDER BY created_at DESC",
      [userId],
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.createEntry = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Contenu manquant" });
    }
    await db.query(
      "INSERT INTO journal_entries (utilisateur_id, date, content, created_at) VALUES (?, NOW(), ?, NOW())",
      [userId, content],
    );
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.updateEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Contenu manquant" });
    }
    await db.query(
      "UPDATE journal_entries SET content = ? WHERE id = ? AND utilisateur_id = ?",
      [content, id, userId],
    );
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    await db.query(
      "DELETE FROM journal_entries WHERE id = ? AND utilisateur_id = ?",
      [id, userId],
    );
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

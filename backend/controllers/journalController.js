const journalModel = require("../models/journalModel");

exports.getAllEntries = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const rows = await journalModel.getAllByUser(userId);
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
    await journalModel.create(userId, content);
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
    await journalModel.update(id, userId, content);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    await journalModel.delete(id, userId);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

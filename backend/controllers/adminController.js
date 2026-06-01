const userModel = require("../models/userModel");
const moodModel = require("../models/moodModel");
const journalModel = require("../models/journalModel");
const citationsModel = require("../models/citationsModel");

exports.getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalMoods, totalJournals, moodRows] =
      await Promise.all([
        userModel.count(),
        moodModel.countAll(),
        journalModel.countAll(),
        moodModel.getStats(),
      ]);

    const moodStats = {};
    moodRows.forEach((m) => (moodStats[m.label] = m.count));

    res.json({ totalUsers, totalMoods, totalJournals, moodStats });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }
    if (parseInt(req.params.id) === req.session.user.id) {
      return res
        .status(400)
        .json({ message: "Impossible de modifier son propre rôle" });
    }
    await userModel.updateRole(req.params.id, role);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (parseInt(req.params.id) === req.session.user.id) {
      return res
        .status(400)
        .json({ message: "Impossible de se supprimer soi-même" });
    }
    await userModel.deleteById(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.getCitations = async (req, res, next) => {
  try {
    const citations = await citationsModel.getAll();
    res.json(citations);
  } catch (err) {
    next(err);
  }
};

exports.createCitation = async (req, res, next) => {
  try {
    const { mood, text } = req.body;
    await citationsModel.create(mood, text);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.updateCitation = async (req, res, next) => {
  try {
    const { mood, text } = req.body;
    if (!mood || !text) {
      return res.status(400).json({ message: "Champs manquants" });
    }
    await citationsModel.update(req.params.id, mood, text);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteCitation = async (req, res, next) => {
  try {
    await citationsModel.deleteById(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

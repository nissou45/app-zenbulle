const moodModel = require("../models/moodModel");

exports.saveMood = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const { mood } = req.body;

    const rows = await moodModel.findByLabel(mood);
    if (!rows.length) {
      return res.status(404).json({ message: "Humeur introuvable" });
    }

    await moodModel.save(userId, rows[0].id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.getUserMoods = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const rows = await moodModel.getByUser(userId);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

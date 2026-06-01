const citationsModel = require("../models/citationsModel");
const citationsLocales = require("../data/citations.json");

exports.getRandomCitation = async (req, res, next) => {
  try {
    const { mood } = req.query;

    const rows = await citationsModel.getRandomByMood(mood);

    if (rows.length > 0) {
      return res.json({ text: rows[0].text });
    }

    const liste = citationsLocales[mood] || [
      "Sois doux avec toi-même.",
      "Tu es exactement où tu dois être.",
      "Prends soin de toi aujourd'hui.",
    ];
    const citation = liste[Math.floor(Math.random() * liste.length)];
    return res.json({ text: citation });
  } catch (err) {
    next(err);
  }
};

const citationsLocales = require("../data/citations.json");

const getCitationLocale = (mood) => {
  const liste = citationsLocales[mood] || [
    "Sois doux avec toi-même.",
    "Tu es exactement où tu dois être.",
    "Prends soin de toi aujourd'hui.",
  ];
  return liste[Math.floor(Math.random() * liste.length)];
};

exports.getRandomCitation = (req, res) => {
  const { mood } = req.query;
  const citation = getCitationLocale(mood);
  return res.json({ text: citation });
};

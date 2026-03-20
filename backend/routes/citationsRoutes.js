const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const citationsLocales = require("../data/citations.json");

// Fonction pour récupérer une citation depuis ZenQuotes API
const getCitationFromAPI = async () => {
  const response = await fetch("https://zenquotes.io/api/random");
  const data = await response.json();
  return data[0].q + " — " + data[0].a;
};

// Fonction pour récupérer une citation locale selon l'humeur
const getCitationLocale = (mood) => {
  const liste =
    citationsLocales[mood] || Object.values(citationsLocales).flat();
  return liste[Math.floor(Math.random() * liste.length)];
};

// GET citation
router.get("/citations", auth, async (req, res) => {
  const { mood } = req.query;

  try {
    // On essaie l'API externe d'abord
    const citation = await getCitationFromAPI();
    return res.json({ text: citation, source: "api" });
  } catch (err) {
    // Si l'API est indisponible → fallback JSON local
    console.log("API citations indisponible, fallback local");
    const citation = getCitationLocale(mood);
    return res.json({ text: citation, source: "local" });
  }
});

module.exports = router;

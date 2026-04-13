const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.register = (req, res) => {
  const { email, password, pseudo } = req.body;

  if (!email || !password || !pseudo) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  userModel.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    if (results && results.length > 0) {
      return res.status(409).json({ message: "Utilisateur déjà existant" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });
      userModel.create(
        { email, password_hash: hash, pseudo },
        (err, userId) => {
          if (err) return res.status(500).json({ message: "Erreur serveur" });

          req.session.user = { id: userId, pseudo, email };
          return res
            .status(201)
            .json({ message: "Bienvenue dans ZenBulle 🫧" });
        },
      );
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  userModel.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    if (!results || results.length === 0) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password_hash.trim(), (err, match) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });
      if (!match) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      req.session.user = {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email,
      };
      return res.json({ message: "Connexion réussie 🫧" });
    });
  });
};

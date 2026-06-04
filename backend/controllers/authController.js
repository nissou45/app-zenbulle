const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.register = async (req, res, next) => {
  try {
    const { email, password, pseudo } = req.body;

    if (!email || !password || !pseudo) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const existingEmail = await userModel.findByEmail(email);
    if (existingEmail.length > 0) {
      return res.status(409).json({ message: "Cet email est déjà utilisé" });
    }

    const existingPseudo = await userModel.findByPseudo(pseudo);
    if (existingPseudo.length > 0) {
      return res.status(409).json({ message: "Ce pseudo est déjà pris" });
    }

    const hash = await bcrypt.hash(password, 10);
    const userId = await userModel.create({
      email,
      password_hash: hash,
      pseudo,
    });

    req.session.user = {
      id: userId,
      pseudo,
      email,
      role: "user",
    };
    req.session.save((err) => {
      if (err) return next(err);
      return res.status(201).json({ message: "Bienvenue dans ZenBulle 🫧" });
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const results = await userModel.findByEmail(email);
    if (results.length === 0) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    req.session.user = {
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      role: user.role,
    };
    req.session.save((err) => {
      if (err) return next(err);
      return res.json({ message: "Connexion réussie 🫧" });
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    res.json({
      id: req.session.user.id,
      pseudo: req.session.user.pseudo,
      email: req.session.user.email,
      role: req.session.user.role,
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(500).json({ message: "Erreur lors de la déconnexion" });
    res.json({ ok: true });
  });
};

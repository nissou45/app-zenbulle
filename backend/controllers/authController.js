const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.register = async (req, res, next) => {
  try {
    const { email, password, pseudo } = req.body;

    if (!email || !password || !pseudo) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    // Vérifier si l'email existe déjà
    const existingEmail = await userModel.findByEmail(email);
    if (existingEmail.length > 0) {
      return res.status(409).json({ message: "Cet email est déjà utilisé" });
    }

    // Vérifier si le pseudo existe déjà
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

    req.session.user = { id: userId, pseudo, email, role: "user" };
    return res.status(201).json({ message: "Bienvenue dans ZenBulle 🫧" });
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
    return res.json({ message: "Connexion réussie 🫧" });
  } catch (err) {
    next(err);
  }
};

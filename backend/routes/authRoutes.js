const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const auth = require("../middlewares/auth");
const authController = require("../controllers/authController");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Trop de tentatives, réessaie dans 15 minutes" },
});

// Auth
router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);

// Session
router.get("/me", auth, (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }
  res.json({
    id: req.session.user.id,
    pseudo: req.session.user.pseudo,
    email: req.session.user.email,
  });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(500).json({ message: "Erreur lors de la déconnexion" });
    res.json({ ok: true });
  });
});

module.exports = router;

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

// Session (le middleware auth vérifie déjà l'authentification)
router.get("/me", auth, authController.me);

// Logout
router.post("/logout", auth, (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(500).json({ message: "Erreur lors de la déconnexion" });
    res.json({ ok: true });
  });
});

module.exports = router;

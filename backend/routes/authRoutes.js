const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const authController = require("../controllers/authController");

// Auth
router.post("/register", authController.register);
router.post("/login", authController.login);

// Session
router.get("/me", auth, (req, res) => {
  res.json({ pseudo: req.session.user.pseudo });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

module.exports = router;

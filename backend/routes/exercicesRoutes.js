const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const exercicesController = require("../controllers/exercicesController");

router.get("/exercices", auth, exercicesController.getAllExercices);

module.exports = router;

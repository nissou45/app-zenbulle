const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const citationsController = require("../controllers/citationsController");

router.get("/citations", auth, citationsController.getRandomCitation);

module.exports = router;

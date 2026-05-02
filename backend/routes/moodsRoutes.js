const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const moodsController = require("../controllers/moodsController");

router.post("/moods", auth, moodsController.saveMood);
router.get("/moods", auth, moodsController.getUserMoods);

module.exports = router;

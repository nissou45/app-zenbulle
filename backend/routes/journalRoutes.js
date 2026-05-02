const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const journalController = require("../controllers/journalController");

router.get("/journal", auth, journalController.getAllEntries);
router.post("/journal", auth, journalController.createEntry);
router.put("/journal/:id", auth, journalController.updateEntry);
router.delete("/journal/:id", auth, journalController.deleteEntry);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const adminController = require("../controllers/adminController");

router.use(auth, isAdmin);

router.get("/stats", adminController.getStats);
router.get("/users", adminController.getUsers);
router.put("/users/:id", adminController.updateUserRole);
router.delete("/users/:id", adminController.deleteUser);
router.get("/citations", adminController.getCitations);
router.post("/citations", adminController.createCitation);
router.put("/citations/:id", adminController.updateCitation);
router.delete("/citations/:id", adminController.deleteCitation);

module.exports = router;

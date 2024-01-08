const express = require("express");
const router = express.Router();
const { removeDrugById } = require("../controllers/remove");

// delete drug by id
router.delete("/api/deleteDrug/:id", removeDrugById);

module.exports = router;

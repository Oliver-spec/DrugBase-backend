const express = require("express");
const router = express.Router();
const {
  validateDrug,
  validateMultipleDrugs,
} = require("../middlewares/validation");
const { addDrug, addMultipleDrugs } = require("../controllers/add");

// add drug
router.post("/api/addDrug", validateDrug, addDrug);

// add multiple drugs
router.post("/api/addMultipleDrugs", validateMultipleDrugs, addMultipleDrugs);

module.exports = router;

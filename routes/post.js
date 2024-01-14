const express = require("express");
const router = express.Router();
const { addDrug, addMultipleDrugs } = require("../controllers/add");

// add drug
router.post("/api/addDrug", addDrug);

// add multiple drugs
router.post("/api/addMultipleDrugs", addMultipleDrugs);

module.exports = router;

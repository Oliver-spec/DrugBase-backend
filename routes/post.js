const express = require("express");
const router = express.Router();
const { validateDrug } = require("../middlewares/validation");
const { addDrug } = require("../controllers/add");

// add drug
router.post("/api/addDrug", validateDrug, addDrug);

module.exports = router;

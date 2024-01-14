const express = require("express");
const router = express.Router();

const { updateDrugById } = require("../controllers/update");

// update drug by id
router.patch("/api/updateDrug/:id", updateDrugById);

module.exports = router;

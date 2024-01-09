const express = require("express");
const router = express.Router();

const { updateDrugById } = require("../controllers/update");

router.patch("/api/updateDrug/:id", updateDrugById);

module.exports = router;

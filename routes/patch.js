const express = require("express");
const router = express.Router();

const { updateDrugById } = require("../controllers/update");
const getUpdatedDrug = require("../middlewares/getUpdatedDrug");
const { validateDrug } = require("../middlewares/validation");

// update drug by id
router.patch(
  "/api/updateDrug/:id",
  getUpdatedDrug,
  validateDrug,
  updateDrugById
);

module.exports = router;

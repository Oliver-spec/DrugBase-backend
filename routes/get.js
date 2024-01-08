const express = require("express");
const router = express.Router();
const {
  fetchAllDrugs,
  searchDrugs,
  fetchAllDrugClasses,
  fetchDrugsByClass,
} = require("../controllers/fetch");
const { validateQuery } = require("../middlewares/validation");

// fetch all drugs
router.get("/api/drugs", fetchAllDrugs);

// fetch drug by ILIKE drug name
router.get("/api/search", validateQuery, searchDrugs);

// fetch all drug classes
router.get("/api/drugClasses", fetchAllDrugClasses);

// fetch drugs by excat class name
router.get("/api/drugsByClass/:drugClass", fetchDrugsByClass);

module.exports = router;

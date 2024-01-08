const express = require("express");
const router = express.Router();
const db = require("../database/connect");

// fetch all drugs
router.get("/api/drugs", async (req, res, next) => {
  try {
    const data = await db.any("SELECT * FROM drugs");

    res.send(data);
  } catch (err) {
    next(err);
  }
});

// fetch drug by ILIKE drug name
router.get("/api/search/:drugName", async (req, res, next) => {
  try {
    const drugName = req.params.drugName;

    const data = await db.any("SELECT * FROM drugs WHERE name ILIKE $1", [
      `%${drugName}%`,
    ]);

    res.send(data);
  } catch (err) {
    next(err);
  }
});

// fetch all drug classes
router.get("/api/drugClasses", async (req, res, next) => {
  try {
    const data = await db.any("SELECT DISTINCT class FROM drugs");

    res.send(data);
  } catch (err) {
    next(err);
  }
});

// fetch drugs by excat class name
router.get("/api/drugsByClass/:drugClass", async (req, res, next) => {
  try {
    const drugClassQuery = req.params.drugClass;

    const data = await db.any("SELECT * FROM drugs WHERE class = $1", [
      drugClassQuery,
    ]);

    res.send(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

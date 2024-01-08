const db = require("../database/connect");

async function fetchAllDrugs(req, res, next) {
  try {
    const data = await db.any("SELECT * FROM drugs");

    res.send(data);
  } catch (err) {
    next(err);
  }
}

async function searchDrugs(req, res, next) {
  try {
    const drugName = req.params.drugName;

    const data = await db.any("SELECT * FROM drugs WHERE name ILIKE $1", [
      `%${drugName}%`,
    ]);

    res.send(data);
  } catch (err) {
    next(err);
  }
}

async function fetchAllDrugClasses(req, res, next) {
  try {
    const data = await db.any("SELECT DISTINCT class FROM drugs");

    res.send(data);
  } catch (err) {
    next(err);
  }
}

async function fetchDrugsByClass(req, res, next) {
  try {
    const drugClassQuery = req.params.drugClass;

    const data = await db.any("SELECT * FROM drugs WHERE class = $1", [
      drugClassQuery,
    ]);

    res.send(data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  fetchAllDrugs,
  searchDrugs,
  fetchAllDrugClasses,
  fetchDrugsByClass,
};

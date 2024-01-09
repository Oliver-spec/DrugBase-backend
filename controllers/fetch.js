const db = require("../database/connect");

async function fetchAllDrugs(req, res, next) {
  try {
    const data = await db.any("SELECT * FROM drugs");

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

async function searchDrugs(req, res, next) {
  try {
    const drugName = req.query.drugName;

    const data = await db.any("SELECT * FROM drugs WHERE name ILIKE $1", [
      `%${drugName}%`,
    ]);

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

async function fetchAllDrugClasses(req, res, next) {
  try {
    const data = await db.any("SELECT DISTINCT class FROM drugs");

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

async function fetchDrugsByClass(req, res, next) {
  try {
    const drugClass = req.params.drugClass;

    const data = await db.any("SELECT * FROM drugs WHERE class = $1", [
      drugClass,
    ]);

    res.status(200).send(data);
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

const db = require("../database/connect");

async function addDrug(req, res, next) {
  try {
    const drug = req.body;

    await db.none("INSERT INTO drugs (name, class) VALUES ($1, $2)", [
      drug.name,
      drug.class,
    ]);

    res.status(201).send({ status: "Success" });
  } catch (err) {
    next(err);
  }
}

async function addMultipleDrugs(req, res, next) {
  try {
    const drugs = req.body;

    for (let drug of drugs) {
      await db.none("INSERT INTO drugs (name, class) VALUES ($1, $2)", [
        drug.name,
        drug.class,
      ]);
    }

    res.status(201).send({ status: "Success" });
  } catch (err) {
    next(err);
  }
}

module.exports = { addDrug, addMultipleDrugs };

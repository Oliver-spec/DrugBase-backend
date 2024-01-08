const db = require("../database/connect");

async function addDrug(req, res, next) {
  try {
    const drug = req.body;

    await db.none("INSERT INTO drugs (name, class) VALUES ($1, $2)", [
      drug.name,
      drug.class,
    ]);

    res.status(201).send("Posted");
  } catch (err) {
    next(err);
  }
}

module.exports = { addDrug };

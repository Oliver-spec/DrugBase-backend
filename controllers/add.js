const db = require("../database/connect");
const { z } = require("zod");

async function addDrug(req, res, next) {
  try {
    const drug = req.body;

    const drugValidator = z
      .object({
        name: z.string().min(1).max(100),
        class: z.string().min(1).max(100),
      })
      .strict();

    const validatedDrug = drugValidator.parse(drug);

    await db.none("INSERT INTO drugs (name, class) VALUES ($1, $2)", [
      validatedDrug.name,
      validatedDrug.class,
    ]);

    res.status(201).send({ status: "Success" });
  } catch (err) {
    next(err);
  }
}

async function addMultipleDrugs(req, res, next) {
  try {
    const drugs = req.body;

    const drugValidator = z
      .object({
        name: z.string().min(1).max(100),
        class: z.string().min(1).max(100),
      })
      .strict();

    for (let drug of drugs) {
      const validatedDrug = drugValidator.parse(drug);

      await db.none("INSERT INTO drugs (name, class) VALUES ($1, $2)", [
        validatedDrug.name,
        validatedDrug.class,
      ]);
    }

    res.status(201).send({ status: "Success" });
  } catch (err) {
    next(err);
  }
}

module.exports = { addDrug, addMultipleDrugs };

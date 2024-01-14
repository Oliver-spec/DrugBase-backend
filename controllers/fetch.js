const db = require("../database/connect");
const { z } = require("zod");

async function fetchAllDrugs(req, res, next) {
  try {
    const query = req.query;

    const queryVaildator = z
      .object({
        page: z.coerce.number().int().min(1).max(1000),
      })
      .strict();

    const validatedQuery = queryVaildator.parse(query);
    const { page } = validatedQuery;

    const limit = 5;
    const offset = (page - 1) * limit;

    const data = await db.any("SELECT * FROM drugs LIMIT $1 OFFSET $2", [
      limit,
      offset,
    ]);

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

async function searchDrugs(req, res, next) {
  try {
    const query = req.query;

    const queryVaildator = z
      .object({
        drugName: z.string().min(1).max(100),
        page: z.coerce.number().int().min(1).max(1000),
      })
      .strict();

    const validatedQuery = queryVaildator.parse(query);
    const { drugName, page } = validatedQuery;

    const limit = 5;
    const offset = (page - 1) * limit;

    const data = await db.any(
      "SELECT * FROM drugs WHERE name ILIKE $1 LIMIT $2 OFFSET $3",
      [`${drugName}%`, limit, offset]
    );

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

async function fetchAllDrugClasses(req, res, next) {
  try {
    const query = req.query;

    const queryVaildator = z
      .object({
        page: z.coerce.number().int().min(1).max(1000),
      })
      .strict();

    const validatedQuery = queryVaildator.parse(query);
    const { page } = validatedQuery;

    const limit = 5;
    const offset = (page - 1) * limit;

    const data = await db.any(
      "SELECT DISTINCT class FROM drugs LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

async function fetchDrugsByClass(req, res, next) {
  try {
    const query = req.query;

    const queryVaildator = z
      .object({
        page: z.coerce.number().int().min(1).max(1000),
        drugClass: z.string().min(1).max(100),
      })
      .strict();

    const validatedQuery = queryVaildator.parse(query);
    const { page, drugClass } = validatedQuery;

    const limit = 5;
    const offset = (page - 1) * limit;

    const data = await db.any(
      "SELECT * FROM drugs WHERE class = $1 LIMIT $2 OFFSET $3",
      [drugClass, limit, offset]
    );

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

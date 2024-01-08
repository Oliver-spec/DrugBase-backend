require("dotenv").config();
const express = require("express");
const pgp = require("pg-promise")();
const { z } = require("zod");

const app = express();

const password = process.env.PASSWORD;
const db = pgp(
  `postgresql://oliverkui0324:${password}@ep-dawn-poetry-97326216.ap-southeast-1.aws.neon.tech/DrugBase?sslmode=require`
);

app.use(express.json());

app.get("/api/search/:query", async (req, res, next) => {
  try {
    const queryTerm = req.params.query;

    const data = await db.any("SELECT * FROM drugs WHERE name ILIKE $1", [
      `%${queryTerm}%`,
    ]);

    res.send(data);
  } catch (err) {
    next(err);
  }
});

app.get("/api/drugs", async (req, res, next) => {
  try {
    const data = await db.any("SELECT * FROM drugs");

    res.send(data);
  } catch (err) {
    next(err);
  }
});

app.get("/api/drugClasses", async (req, res, next) => {
  try {
    const data = await db.any("SELECT DISTINCT class FROM drugs");

    res.send(data);
  } catch (err) {
    next(err);
  }
});

app.post("/api/addDrug", async (req, res, next) => {
  try {
    const drug = req.body;

    const Drug = z.object({
      name: z.string(),
      class: z.string(),
    });

    Drug.parse(drug);

    await db.none("INSERT INTO drugs (name, class) VALUES ($1, $2)", [
      drug.name,
      drug.class,
    ]);

    res.send("Posted");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.send("Server Error");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

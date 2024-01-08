const express = require("express");
const router = express.Router();
const db = require("../database/connect");
const { validateDrug } = require("../middlewares/validation");

// add drug
router.post("/api/addDrug", validateDrug, async (req, res, next) => {
  try {
    const drug = req.body;

    await db.none("INSERT INTO drugs (name, class) VALUES ($1, $2)", [
      drug.name,
      drug.class,
    ]);

    res.send("Posted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

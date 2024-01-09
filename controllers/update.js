const db = require("../database/connect");

async function updateDrugById(req, res, next) {
  try {
    const updatedDrug = req.updatedDrug;
    const id = req.params.id;

    await db.none("UPDATE drugs SET name = $1, class = $2 WHERE id = $3", [
      updatedDrug.name,
      updatedDrug.class,
      id,
    ]);

    res.status(201).send({ status: "Success" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  updateDrugById,
};

const db = require("../database/connect");

async function getUpdatedDrug(req, res, next) {
  try {
    const id = req.params.id;
    const patch = req.body;

    const originalDrug = await db.one("SELECT * FROM drugs WHERE id = $1", [
      id,
    ]);

    const updatedDrug = {
      ...originalDrug,
      ...patch,
    };

    req.updatedDrug = updatedDrug;
    req.originalId = originalDrug.id;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = getUpdatedDrug;

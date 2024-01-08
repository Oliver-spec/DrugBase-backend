const db = require("../database/connect");

async function removeDrugById(req, res, next) {
  try {
    const id = req.params.id;

    await db.none("DELETE FROM drugs WHERE id = $1", [id]);

    res.status(200).send("Deleted");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  removeDrugById,
};

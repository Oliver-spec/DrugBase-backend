const db = require("../database/connect");
const { z } = require("zod");

async function removeDrugById(req, res, next) {
  try {
    const id = req.params.id;

    const idValidator = z.string().uuid();
    const validatedId = idValidator.parse(id);

    await db.none("DELETE FROM drugs WHERE id = $1", [validatedId]);

    res.status(200).send({ status: "Success" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  removeDrugById,
};

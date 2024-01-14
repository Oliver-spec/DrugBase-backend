const db = require("../database/connect");
const { z } = require("zod");

async function updateDrugById(req, res, next) {
  try {
    const id = req.params.id;

    const idValidator = z.string().uuid();
    const validatedId = idValidator.parse(id);

    const originalDrug = await db.one(
      "SELECT name, class FROM drugs WHERE id = $1",
      [validatedId]
    );

    const patch = req.body;

    const updatedDrug = {
      ...originalDrug,
      ...patch,
    };

    const updatedDrugValidator = z
      .object({
        name: z.string().min(1).max(100),
        class: z.string().min(1).max(100),
      })
      .strict();
    const validatedUpdatedDrug = updatedDrugValidator.parse(updatedDrug);

    await db.none("UPDATE drugs SET name = $1, class = $2 WHERE id = $3", [
      validatedUpdatedDrug.name,
      validatedUpdatedDrug.class,
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

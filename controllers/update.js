const db = require("../database/connect");
const { z } = require("zod");

async function updateDrugById(req, res, next) {
  try {
    const id = req.params.id;
    const patch = req.body;

    const originalDrug = await db.one("SELECT * FROM drugs WHERE id = $1", [
      id,
    ]);

    const newDrug = {
      ...originalDrug,
      ...patch,
    };

    const Drug = z
      .object({
        id: z.literal(originalDrug.id),
        name: z.string().min(1).max(100),
        class: z.string().min(1).max(100),
      })
      .strict();

    Drug.parse(newDrug);

    await db.none("UPDATE drugs SET name = $1, class = $2 WHERE id = $3", [
      newDrug.name,
      newDrug.class,
      id,
    ]);

    res.status(201).send("Patched");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  updateDrugById,
};

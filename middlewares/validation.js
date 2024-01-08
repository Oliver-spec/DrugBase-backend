const { z } = require("zod");

function validateDrug(req, res, next) {
  try {
    const drug = req.body;

    const Drug = z
      .object({
        name: z.string(),
        class: z.string(),
      })
      .strict();

    Drug.parse(drug);

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateDrug,
};

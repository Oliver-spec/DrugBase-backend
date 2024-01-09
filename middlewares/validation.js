const { z } = require("zod");

function validateDrug(req, res, next) {
  try {
    const drug = req.body;

    const Drug = z
      .object({
        name: z.string().min(1).max(100),
        class: z.string().min(1).max(100),
      })
      .strict();

    Drug.parse(drug);

    next();
  } catch (err) {
    next(err);
  }
}

function validateQuery(req, res, next) {
  try {
    const query = req.query;

    const Query = z
      .object({
        drugName: z.string().min(1).max(100),
      })
      .strict();

    Query.parse(query);

    next();
  } catch (err) {
    next(err);
  }
}

function validateDrugClass(req, res, next) {
  try {
    const drugClass = req.params.drugClass;

    const DrugClass = z.string().min(1).max(100);

    DrugClass.parse(drugClass);

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateDrug,
  validateQuery,
  validateDrugClass,
};

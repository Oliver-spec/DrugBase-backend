const express = require("express");
const router = express.Router();
const db = require("../database/connect");

// delete drug by id
router.delete("/api/deleteDrug/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    await db.none("DELETE FROM drugs WHERE id = $1", [id]);

    res.send("Deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

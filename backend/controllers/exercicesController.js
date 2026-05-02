const db = require("../config/db");

exports.getAllExercices = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM exercices");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

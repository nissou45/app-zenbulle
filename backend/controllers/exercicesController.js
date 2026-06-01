const exercicesModel = require("../models/exercicesModel");

exports.getAllExercices = async (req, res, next) => {
  try {
    const rows = await exercicesModel.getAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

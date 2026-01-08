const Income = require("../models/Income.model");

/* CREATE */
exports.create = async (req, res) => {
  const data = await Income.create(req.body);
  res.json({ success: true, data });
};

/* LIST */
exports.list = async (req, res) => {
  const { month, year, source } = req.query;
  const filter = {};

  if (source) filter.source = source;

  if (month && year) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    filter.date = { $gte: start, $lt: end };
  }

  const data = await Income.find(filter).sort({ date: -1 });
  res.json({ success: true, data });
};

/* UPDATE */
exports.update = async (req, res) => {
  const data = await Income.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data });
};

/* DELETE */
exports.remove = async (req, res) => {
  await Income.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

/* MONTHLY SUMMARY */
exports.monthlySummary = async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();

  const data = await Income.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31)
        }
      }
    },
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$amount" }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json({ success: true, data });
};

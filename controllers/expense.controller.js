const Expense = require("../models/Expense.model");

// CREATE
exports.create = async (req, res) => {
  const expense = await Expense.create(req.body);
  res.json({ success: true, data: expense });
};

// LIST (with filter)
exports.list = async (req, res) => {
  const { month, year, category } = req.query;
  const filter = {};

  if (category) filter.category = category;

  if (month && year) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    filter.date = { $gte: start, $lt: end };
  }

  const data = await Expense.find(filter).sort({ date: -1 });
  res.json({ success: true, data });
};

// UPDATE
exports.update = async (req, res) => {
  const data = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data });
};

// DELETE
exports.remove = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// MONTHLY SUMMARY
exports.monthlySummary = async (req, res) => {
  const { year } = req.query;

  const data = await Expense.aggregate([
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
    { $sort: { "_id": 1 } }
  ]);

  res.json({ success: true, data });
};

// CATEGORY SUMMARY
exports.categorySummary = async (req, res) => {
  const data = await Expense.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json({ success: true, data });
};

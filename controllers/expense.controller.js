const Expense = require("../models/Expense.model");
const Settings = require("../models/Settings.model");
const Notification = require("../models/Notification.model");

/* CREATE */
exports.create = async (req, res) => {
  const expense = await Expense.create(req.body);

  const settings = await Settings.findOne();
  if (!settings || !settings.expense.alertEnabled) {
    return res.json({ success: true, data: expense });
  }

  const limit = settings.expense.monthlyLimit;
  if (!limit || limit <= 0) {
    return res.json({ success: true, data: expense });
  }

  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const monthlyAgg = await Expense.aggregate([
    { $match: { date: { $gte: startOfMonth } } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const total = monthlyAgg[0]?.total || 0;

  if (total > limit) {
    await Notification.create({
      title: "Budget Exceeded",
      message: `Monthly expense exceeded limit (${total} / ${limit})`,
      type: "System"
    });
  }

  res.json({ success: true, data: expense });
};

/* LIST (FILTERABLE) */
exports.list = async (req, res) => {
  const { month, year, category } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (month && year) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    filter.date = { $gte: start, $lt: end };
  }

  const data = await Expense.find(filter).sort({ date: -1 });
  res.json({ success: true, data });
};

/* UPDATE */
exports.update = async (req, res) => {
  const data = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data });
};

/* DELETE */
exports.remove = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Expense deleted" });
};

/* MONTHLY SUMMARY (BAR / LINE CHART) */
exports.monthlySummary = async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();

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
    { $sort: { _id: 1 } }
  ]);

  res.json({ success: true, data });
};

/* CATEGORY SUMMARY (PIE CHART) */
exports.categorySummary = async (req, res) => {
  const data = await Expense.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    },
    { $sort: { total: -1 } }
  ]);

  res.json({ success: true, data });
};

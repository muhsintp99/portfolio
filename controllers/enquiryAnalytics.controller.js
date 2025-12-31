const Enquiry = require("../models/Enquiry.model");

// 📊 Overall analytics
exports.overview = async (req, res) => {
  const total = await Enquiry.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayCount = await Enquiry.countDocuments({
    createdAt: { $gte: today }
  });

  const byStatus = await Enquiry.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  const bySource = await Enquiry.aggregate([
    { $group: { _id: "$source", count: { $sum: 1 } } }
  ]);

  const closedCount = await Enquiry.countDocuments({ status: "Closed" });

  const conversionRate =
    total === 0 ? 0 : ((closedCount / total) * 100).toFixed(2);

  res.json({
    success: true,
    data: {
      total,
      today: todayCount,
      byStatus,
      bySource,
      conversionRate
    }
  });
};


// 📆 Follow-ups due today
exports.todayFollowUps = async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  const data = await Enquiry.find({
    nextFollowUpDate: { $gte: start, $lt: end }
  });

  res.json({ success: true, data });
};


// 📈 Monthly trend
exports.monthlyTrend = async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();

  const data = await Enquiry.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31)
        }
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  res.json({ success: true, data });
};

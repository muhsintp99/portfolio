const Notification = require("../models/Notification.model");

// LIST NOTIFICATIONS
exports.list = async (req, res) => {
  const data = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ success: true, data });
};

// MARK AS READ
exports.markRead = async (req, res) => {
  const data = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  res.json({ success: true, data });
};

// UNREAD COUNT (DASHBOARD)
exports.unreadCount = async (req, res) => {
  const count = await Notification.countDocuments({ isRead: false });
  res.json({ success: true, count });
};

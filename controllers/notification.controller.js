const Notification = require("../models/Notification.model");

/* LIST (LATEST 50) */
exports.list = async (req, res) => {
  const data = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ success: true, data });
};

/* MARK ONE AS READ */
exports.markRead = async (req, res) => {
  const data = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  res.json({ success: true, data });
};

/* MARK ALL AS READ (OPTIONAL – VERY USEFUL) */
exports.markAllRead = async (req, res) => {
  await Notification.updateMany(
    { isRead: false },
    { isRead: true }
  );
  res.json({ success: true });
};

/* UNREAD COUNT */
exports.unreadCount = async (req, res) => {
  const count = await Notification.countDocuments({ isRead: false });
  res.json({ success: true, count });
};

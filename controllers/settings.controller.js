const Settings = require("../models/Settings.model");

/* GET SETTINGS (SINGLE DOC) */
exports.get = async (req, res) => {
  let settings = await Settings.findOne();

  // auto-create if not exists
  if (!settings) {
    settings = await Settings.create({});
  }

  res.json({ success: true, data: settings });
};

/* UPDATE SETTINGS */
exports.update = async (req, res) => {
  const settings = await Settings.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true }
  );

  res.json({ success: true, data: settings });
};

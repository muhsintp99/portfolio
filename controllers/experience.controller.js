const Experience = require("../models/Experience.model");

exports.create = async (req, res) => {
  const data = await Experience.create(req.body);
  res.json({ success: true, data });
};

exports.list = async (req, res) => {
  const data = await Experience.find().sort({ startDate: -1 });
  res.json({ success: true, data });
};

exports.update = async (req, res) => {
  const data = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data });
};

exports.remove = async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

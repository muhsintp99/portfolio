const Certificate = require("../models/Certificate.model");

exports.create = async (req, res) => {
  const data = await Certificate.create(req.body);
  res.json({ success: true, data });
};

exports.list = async (req, res) => {
  const data = await Certificate.find().sort({ year: -1 });
  res.json({ success: true, data });
};

exports.update = async (req, res) => {
  const data = await Certificate.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data });
};

exports.remove = async (req, res) => {
  await Certificate.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

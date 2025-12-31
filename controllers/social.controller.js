const Social = require("../models/Social.model");

// CREATE
exports.create = async (req, res) => {
  const social = await Social.create(req.body);
  res.json({ success: true, data: social });
};

// LIST (PUBLIC)
exports.list = async (req, res) => {
  const data = await Social.find().sort({ createdAt: -1 });
  res.json({ success: true, data });
};

// UPDATE
exports.update = async (req, res) => {
  const data = await Social.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data });
};

// DELETE
exports.remove = async (req, res) => {
  await Social.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

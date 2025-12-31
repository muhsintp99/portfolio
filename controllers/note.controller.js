const Note = require("../models/Note.model");

exports.create = async (req, res) => {
  const note = await Note.create(req.body);
  res.json({ success: true, data: note });
};

exports.list = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json({ success: true, data: notes });
};

exports.update = async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data: note });
};

exports.remove = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

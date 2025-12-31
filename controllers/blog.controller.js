const Blog = require("../models/Blog.model");

exports.create = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json({ success: true, data: blog });
};

exports.list = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({ success: true, data: blogs });
};

exports.update = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data: blog });
};

exports.remove = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

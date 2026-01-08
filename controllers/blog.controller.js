const Blog = require("../models/Blog.model");
const fs = require("fs");
const path = require("path");

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.coverImage = `/uploads/${req.params.folder}/${req.file.filename}`;
    }

    const blog = await Blog.create(data);
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* LIST (PUBLIC) */
exports.list = async (req, res) => {
  const blogs = await Blog.find()
    .sort({ createdAt: -1 });

  res.json({ success: true, data: blogs });
};

/* COUNT */
exports.count = async (req, res) => {
  const total = await Blog.countDocuments();
  res.json({ success: true, count: total });
};

/* UPDATE */
exports.update = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const data = { ...req.body };

    if (req.file) {
      // delete old image
      if (blog.coverImage) {
        const oldPath = path.join(process.cwd(), blog.coverImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      data.coverImage = `/uploads/${req.params.folder}/${req.file.filename}`;
    }

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* DELETE */
exports.remove = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // delete image
  if (blog.coverImage) {
    const imgPath = path.join(process.cwd(), blog.coverImage);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }

  await blog.deleteOne();
  res.json({ success: true, message: "Blog deleted" });
};

const Blog = require("../models/Blog.model");
const cloudinary = require("../config/cloudinary");

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.coverImage = req.file.path;        // Cloudinary URL
      data.coverImageId = req.file.filename; // public_id
    }

    const blog = await Blog.create(data);

    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* LIST */
exports.list = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
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
      // 🔥 Delete old image from Cloudinary
      if (blog.coverImageId) {
        await cloudinary.uploader.destroy(blog.coverImageId);
      }

      data.coverImage = req.file.path;
      data.coverImageId = req.file.filename;
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
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🔥 Delete image from Cloudinary
    if (blog.coverImageId) {
      await cloudinary.uploader.destroy(blog.coverImageId);
    }

    await blog.deleteOne();

    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
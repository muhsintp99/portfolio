const Social = require("../models/Social.model");
const fs = require("fs");
const path = require("path");

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.image = `/uploads/${req.params.folder}/${req.file.filename}`;
    }

    const social = await Social.create(data);
    res.json({ success: true, data: social });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* LIST (PUBLIC) */
exports.list = async (req, res) => {
  const data = await Social.find().sort({ createdAt: -1 });
  res.json({ success: true, data });
};

/* COUNT */
exports.count = async (req, res) => {
  const total = await Social.countDocuments();
  res.json({ success: true, count: total });
};

/* UPDATE */
exports.update = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id);
    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }

    const data = { ...req.body };

    if (req.file) {
      // delete old image
      if (social.image) {
        const oldPath = path.join(process.cwd(), social.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      data.image = `/uploads/${req.params.folder}/${req.file.filename}`;
    }

    const updated = await Social.findByIdAndUpdate(
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
  const social = await Social.findById(req.params.id);

  if (!social) {
    return res.status(404).json({ message: "Social not found" });
  }

  // delete image
  if (social.image) {
    const imgPath = path.join(process.cwd(), social.image);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }

  await social.deleteOne();
  res.json({ success: true, message: "Social deleted" });
};

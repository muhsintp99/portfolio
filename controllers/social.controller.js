const Social = require("../models/Social.model");
const cloudinary = require("../config/cloudinary");

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.image = req.file.path;
      data.imageId = req.file.filename;
    }

    const social = await Social.create(data);

    res.json({ success: true, data: social });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* LIST */
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
      // delete old cloudinary image
      if (social.imageId) {
        await cloudinary.uploader.destroy(social.imageId).catch(() => {});
      }

      data.image = req.file.path;
      data.imageId = req.file.filename;
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
  try {
    const social = await Social.findById(req.params.id);

    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }

    // delete from cloudinary
    if (social.imageId) {
      await cloudinary.uploader.destroy(social.imageId).catch(() => {});
    }

    await social.deleteOne();

    res.json({ success: true, message: "Social deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
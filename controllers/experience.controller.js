const Experience = require("../models/Experience.model");
const cloudinary = require("../config/cloudinary");

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.certificate = req.file.path;
      data.certificateId = req.file.filename;
    }

    const exp = await Experience.create(data);

    res.json({ success: true, data: exp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* LIST */
exports.list = async (req, res) => {
  const data = await Experience.find().sort({ startDate: -1 });
  res.json({ success: true, data });
};

/* COUNT */
exports.count = async (req, res) => {
  const total = await Experience.countDocuments();
  res.json({ success: true, count: total });
};

/* UPDATE */
exports.update = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);

    if (!exp) {
      return res.status(404).json({ message: "Experience not found" });
    }

    const data = { ...req.body };

    if (req.file) {
      // 🔥 delete old image
      if (exp.certificateId) {
        await cloudinary.uploader.destroy(exp.certificateId).catch(() => {});
      }

      data.certificate = req.file.path;
      data.certificateId = req.file.filename;
    }

    const updated = await Experience.findByIdAndUpdate(
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
    const exp = await Experience.findById(req.params.id);

    if (!exp) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // 🔥 delete from cloudinary
    if (exp.certificateId) {
      await cloudinary.uploader.destroy(exp.certificateId).catch(() => {});
    }

    await exp.deleteOne();

    res.json({ success: true, message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const Certificate = require("../models/Certificate.model");
const cloudinary = require("../config/cloudinary");

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.image = req.file.path;
      data.imageId = req.file.filename;
    }

    const cert = await Certificate.create(data);

    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* LIST */
exports.list = async (req, res) => {
  const data = await Certificate.find().sort({ year: -1 });
  res.json({ success: true, data });
};

/* COUNT */
exports.count = async (req, res) => {
  const total = await Certificate.countDocuments();
  res.json({ success: true, count: total });
};

/* UPDATE */
exports.update = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);

    if (!cert) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    const data = { ...req.body };

    if (req.file) {
      // 🔥 delete old image from cloudinary
      if (cert.imageId) {
        await cloudinary.uploader.destroy(cert.imageId).catch(() => {});
      }

      data.image = req.file.path;
      data.imageId = req.file.filename;
    }

    const updated = await Certificate.findByIdAndUpdate(
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
    const cert = await Certificate.findById(req.params.id);

    if (!cert) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // 🔥 delete from cloudinary
    if (cert.imageId) {
      await cloudinary.uploader.destroy(cert.imageId).catch(() => {});
    }

    await cert.deleteOne();

    res.json({ success: true, message: "Certificate deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const Certificate = require("../models/Certificate.model");
const fs = require("fs");
const path = require("path");

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.image = `/uploads/${req.params.folder}/${req.file.filename}`;
    }

    const cert = await Certificate.create(data);
    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* LIST ALL */
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

    // replace image
    if (req.file) {
      // delete old image
      if (cert.image) {
        const oldPath = path.join(process.cwd(), cert.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      data.image = `/uploads/${req.params.folder}/${req.file.filename}`;
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
  const cert = await Certificate.findById(req.params.id);

  if (!cert) {
    return res.status(404).json({ message: "Certificate not found" });
  }

  // delete image file
  if (cert.image) {
    const imgPath = path.join(process.cwd(), cert.image);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }

  await cert.deleteOne();
  res.json({ success: true, message: "Certificate deleted" });
};

const Brand = require("../models/Brand.model");
const cloudinary = require("../config/cloudinary");

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logo = req.file.path;
      data.logoId = req.file.filename;
    }

    const brand = await Brand.create(data);

    res.status(201).json({ success: true, data: brand });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* GET ALL */
exports.getAll = async (req, res) => {
  const brands = await Brand.find().sort({ createdAt: -1 });
  res.json({ success: true, data: brands });
};

/* GET ONE */
exports.getOne = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  res.json({ success: true, data: brand });
};

/* UPDATE */
exports.update = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const data = { ...req.body };

    if (req.file) {
      // 🔥 delete old logo
      if (brand.logoId) {
        await cloudinary.uploader.destroy(brand.logoId).catch(() => {});
      }

      data.logo = req.file.path;
      data.logoId = req.file.filename;
    }

    const updated = await Brand.findByIdAndUpdate(
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
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // 🔥 delete from cloudinary
    if (brand.logoId) {
      await cloudinary.uploader.destroy(brand.logoId).catch(() => {});
    }

    await brand.deleteOne();

    res.json({ success: true, message: "Brand deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* COUNT */
exports.count = async (req, res) => {
  const total = await Brand.countDocuments();
  res.json({ success: true, count: total });
};
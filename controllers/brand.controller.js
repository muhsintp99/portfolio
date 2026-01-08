const Brand = require("../models/Brand.model");

/**
 * CREATE
 * POST /api/brand/:folder
 */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logo = `/uploads/${req.params.folder}/${req.file.filename}`;
    }

    const brand = await Brand.create(data);

    res.status(201).json({ success: true, data: brand });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET ALL
 * GET /api/brand
 */
exports.getAll = async (req, res) => {
  const brands = await Brand.find().sort({ createdAt: -1 });
  res.json({ success: true, data: brands });
};

/**
 * GET ONE
 * GET /api/brand/:id
 */
exports.getOne = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }
  res.json({ success: true, data: brand });
};

/**
 * UPDATE
 * PUT /api/brand/:id/:folder
 */
exports.update = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logo = `/uploads/${req.params.folder}/${req.file.filename}`;
    }

    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ success: true, data: brand });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE
 * DELETE /api/brand/:id
 */
exports.remove = async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);

  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  res.json({ success: true, message: "Brand deleted" });
};

/**
 * COUNT
 * GET /api/brand/count
 */
exports.count = async (req, res) => {
  const total = await Brand.countDocuments();
  res.json({ success: true, count: total });
};

const Brand = require("../models/Brand.model");

exports.save = async (req, res) => {
  const brand = await Brand.findOneAndUpdate(
    {},
    req.body,
    { upsert: true, new: true }
  );
  res.json({ success: true, data: brand });
};

exports.get = async (req, res) => {
  const brand = await Brand.findOne();
  res.json({ success: true, data: brand });
};

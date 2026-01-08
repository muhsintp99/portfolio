const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  tagline: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Brand", BrandSchema);

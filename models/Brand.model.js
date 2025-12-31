const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: String,
  logo: String,
  tagline: String,
  description: String
});

module.exports = mongoose.model("Brand", BrandSchema);

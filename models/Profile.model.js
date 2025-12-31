const mongoose = require("mongoose");
module.exports = mongoose.model("Profile", new mongoose.Schema({
  brand: String,
  about: String,
  contactEmail: String,
  phone: String,
  location: String
}));
const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true   // LinkedIn, GitHub, Instagram
  },
  url: {
    type: String,
    required: true
  },
  image: String,     // uploaded icon or preview
  username: String
}, { timestamps: true });

module.exports = mongoose.model("Social", SocialSchema);

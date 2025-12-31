const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  coverImage: String,
  published: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Blog", BlogSchema);

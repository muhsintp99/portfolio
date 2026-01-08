const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: String,
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
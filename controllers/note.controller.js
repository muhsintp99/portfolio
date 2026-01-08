const Note = require("../models/Note.model");
const fs = require("fs");
const path = require("path");

/* CREATE */
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.image = `/uploads/${req.params.folder}/${req.file.filename}`;
    }

    const note = await Note.create(data);
    res.json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* LIST */
exports.list = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json({ success: true, data: notes });
};

/* COUNT */
exports.count = async (req, res) => {
  const total = await Note.countDocuments();
  res.json({ success: true, count: total });
};

/* UPDATE */
exports.update = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const data = { ...req.body };

    if (req.file) {
      // delete old image
      if (note.image) {
        const oldPath = path.join(process.cwd(), note.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      data.image = `/uploads/${req.params.folder}/${req.file.filename}`;
    }

    const updated = await Note.findByIdAndUpdate(
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
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  // delete image file
  if (note.image) {
    const imgPath = path.join(process.cwd(), note.image);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }

  await note.deleteOne();
  res.json({ success: true, message: "Note deleted" });
};

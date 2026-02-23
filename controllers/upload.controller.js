// exports.uploadImage = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;

//   res.json({
//     success: true,
//     url: imageUrl
//   });
// };


const cloudinary = require("../config/cloudinary");

/* UPLOAD IMAGE */
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    res.json({
      success: true,
      url: req.file.path,
      public_id: req.file.filename
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/* DELETE IMAGE FROM CLOUDINARY */
exports.deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: "public_id required"
      });
    }

    await cloudinary.uploader.destroy(public_id);

    res.json({
      success: true,
      message: "Image deleted"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
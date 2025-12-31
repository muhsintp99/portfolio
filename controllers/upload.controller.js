exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;

  res.json({
    success: true,
    url: imageUrl
  });
};

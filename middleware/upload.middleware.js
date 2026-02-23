// const multer = require("multer");
// const path = require("path");

// // Dynamic folder support
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const folder = req.params.folder || "common";
//     cb(null, `uploads/${folder}`);
//   },
//   filename: (req, file, cb) => {
//     const unique =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       unique + path.extname(file.originalname)
//     );
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (!file.mimetype.startsWith("image/")) {
//     cb(new Error("Only images allowed"), false);
//   }
//   cb(null, true);
// };

// module.exports = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 } // 2MB
// });


// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // folder injected from router
//     const folder = req.params.folder || "common";

//     const uploadPath = path.join("uploads", folder);

//     // ✅ AUTO CREATE FOLDER
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     cb(null, uploadPath);
//   },

//   filename: (req, file, cb) => {
//     const unique =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, unique + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (!file.mimetype.startsWith("image/")) {
//     return cb(new Error("Only images allowed"), false);
//   }
//   cb(null, true);
// };

// module.exports = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 } // 2MB
// });


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// dynamic folder from route
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = req.params.folder || "common";

    return {
      folder: `uploads/${folder}`,   // cloudinary folder
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id:
        Date.now() + "-" + Math.round(Math.random() * 1e9)
    };
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only images allowed"), false);
  }
  cb(null, true);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});
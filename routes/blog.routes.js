const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware"); // cloudinary multer
const ctrl = require("../controllers/blog.controller");

/* --------------------------------------------------
   FIXED CLOUDINARY FOLDER → blogs
-------------------------------------------------- */
const blogFolder = (req, res, next) => {
  req.params.folder = "blogs";
  next();
};

/* ==================================================
   CREATE BLOG
   POST /api/blog
================================================== */
router.post(
  "/",
  auth,
  blogFolder,
  upload.single("coverImage"),
  ctrl.create
);

/* ==================================================
   LIST BLOGS (PUBLIC)
   GET /api/blog
================================================== */
router.get("/", ctrl.list);

/* ==================================================
   BLOG COUNT
   GET /api/blog/count
================================================== */
router.get("/count", ctrl.count);

/* ==================================================
   UPDATE BLOG
   PUT /api/blog/:id
================================================== */
router.put(
  "/:id",
  auth,
  blogFolder,
  upload.single("coverImage"),
  ctrl.update
);

/* ==================================================
   DELETE BLOG
   DELETE /api/blog/:id
================================================== */
router.delete("/:id", auth, ctrl.remove);

module.exports = router;
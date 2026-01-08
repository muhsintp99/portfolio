const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const ctrl = require("../controllers/blog.controller");

// fixed folder for blogs
const blogFolder = (req, res, next) => {
  req.params.folder = "blogs";
  next();
};

/* CREATE */
router.post(
  "/",
  auth,
  blogFolder,
  upload.single("coverImage"),
  ctrl.create
);

/* LIST (PUBLIC) */
router.get("/", ctrl.list);

/* COUNT */
router.get("/count", ctrl.count);

/* UPDATE */
router.put(
  "/:id",
  auth,
  blogFolder,
  upload.single("coverImage"),
  ctrl.update
);

/* DELETE */
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

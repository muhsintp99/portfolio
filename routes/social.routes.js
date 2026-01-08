const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const ctrl = require("../controllers/social.controller");

// fixed folder for social icons
const socialFolder = (req, res, next) => {
  req.params.folder = "socials";
  next();
};

/* CREATE */
router.post(
  "/",
  auth,
  socialFolder,
  upload.single("image"),
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
  socialFolder,
  upload.single("image"),
  ctrl.update
);

/* DELETE */
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

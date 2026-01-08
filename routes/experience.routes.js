const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const ctrl = require("../controllers/experience.controller");

// fixed folder for experience certificates
const experienceFolder = (req, res, next) => {
  req.params.folder = "experience-certificates";
  next();
};

/* CREATE */
router.post(
  "/",
  auth,
  experienceFolder,
  upload.single("certificate"),
  ctrl.create
);

/* LIST */
router.get("/", ctrl.list);

/* COUNT */
router.get("/count", ctrl.count);

/* UPDATE */
router.put(
  "/:id",
  auth,
  experienceFolder,
  upload.single("certificate"),
  ctrl.update
);

/* DELETE */
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

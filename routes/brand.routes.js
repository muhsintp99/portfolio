const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const ctrl = require("../controllers/brand.controller");

// 👇 FIXED FOLDER FOR THIS ROUTE
const brandFolder = (req, res, next) => {
  req.params.folder = "brands";
  next();
};

/* CREATE */
router.post(
  "/",
  auth,
  brandFolder,
  upload.single("logo"),
  ctrl.create
);

/* GET ALL */
router.get("/", ctrl.getAll);

/* COUNT */
router.get("/count", ctrl.count);

/* GET ONE */
router.get("/:id", ctrl.getOne);

/* UPDATE */
router.put(
  "/:id",
  auth,
  brandFolder,
  upload.single("logo"),
  ctrl.update
);

/* DELETE */
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const ctrl = require("../controllers/certificate.controller");

// fixed folder for certificates
const certificateFolder = (req, res, next) => {
  req.params.folder = "certificates";
  next();
};

/* CREATE */
router.post(
  "/",
  auth,
  certificateFolder,
  upload.single("image"),
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
  certificateFolder,
  upload.single("image"),
  ctrl.update
);

/* DELETE */
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const ctrl = require("../controllers/note.controller");

// fixed folder for notes
const noteFolder = (req, res, next) => {
  req.params.folder = "notes";
  next();
};

/* CREATE */
router.post(
  "/",
  auth,
  noteFolder,
  upload.single("image"),
  ctrl.create
);

/* LIST */
router.get("/", auth, ctrl.list);

/* COUNT */
router.get("/count", auth, ctrl.count);

/* UPDATE */
router.put(
  "/:id",
  auth,
  noteFolder,
  upload.single("image"),
  ctrl.update
);

/* DELETE */
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

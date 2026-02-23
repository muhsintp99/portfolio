// const router = require("express").Router();
// const auth = require("../middleware/auth.middleware");
// const upload = require("../middleware/upload.middleware");
// const ctrl = require("../controllers/upload.controller");

// router.post("/:folder", auth, upload.single("image"), ctrl.uploadImage);

// module.exports = router;


const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const ctrl = require("../controllers/upload.controller");

/* UPLOAD */
router.post(
    "/:folder",
    auth,
    upload.single("image"),
    ctrl.uploadImage
);

/* DELETE FROM CLOUDINARY */
router.delete(
    "/delete",
    auth,
    ctrl.deleteImage
);

module.exports = router;
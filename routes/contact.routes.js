const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/contact.controller");

/* PUBLIC – Contact Us */
router.post("/", ctrl.create);

/* ADMIN */
router.get("/", auth, ctrl.list);
router.get("/count", auth, ctrl.count);
router.get("/:id", auth, ctrl.getOne);
router.patch("/:id/reply", auth, ctrl.reply);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

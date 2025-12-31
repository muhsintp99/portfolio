const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/blog.controller");

router.post("/", auth, ctrl.create);
router.get("/", ctrl.list);           // public
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

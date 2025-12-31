const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/todo.controller");

router.post("/", auth, ctrl.create);
router.get("/", auth, ctrl.list);
router.patch("/:id/toggle", auth, ctrl.toggle);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

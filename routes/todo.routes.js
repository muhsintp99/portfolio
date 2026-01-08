const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/todo.controller");

/* CREATE */
router.post("/", auth, ctrl.create);

/* LIST */
router.get("/", auth, ctrl.list);

/* COUNT */
router.get("/count", auth, ctrl.count);

/* UPDATE */
router.put("/:id", auth, ctrl.update);

/* TOGGLE */
router.patch("/:id/toggle", auth, ctrl.toggle);

/* DELETE */
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

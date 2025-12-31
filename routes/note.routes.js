const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/note.controller");

router.post("/", auth, ctrl.create);
router.get("/", auth, ctrl.list);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

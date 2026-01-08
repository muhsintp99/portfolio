const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/settings.controller");

/* GET (ADMIN) */
router.get("/", auth, ctrl.get);

/* UPDATE (ADMIN) */
router.put("/", auth, ctrl.update);

module.exports = router;

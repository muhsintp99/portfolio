const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/auth.controller");

router.post("/login", ctrl.login);
router.post("/refresh", ctrl.refreshToken);
router.post("/logout", auth, ctrl.logout);

module.exports = router;

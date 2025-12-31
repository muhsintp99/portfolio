const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/brand.controller");

router.post("/", auth, ctrl.save);
router.get("/", ctrl.get);   // public

module.exports = router;

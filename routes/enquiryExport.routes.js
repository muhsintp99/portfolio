const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/enquiryExport.controller");

router.get("/csv", auth, ctrl.exportCSV);

module.exports = router;

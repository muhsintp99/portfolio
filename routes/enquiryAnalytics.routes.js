const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/enquiryAnalytics.controller");

router.get("/overview", auth, ctrl.overview);
router.get("/today-followups", auth, ctrl.todayFollowUps);
router.get("/monthly-trend", auth, ctrl.monthlyTrend);

module.exports = router;
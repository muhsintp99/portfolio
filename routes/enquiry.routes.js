const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/enquiry.controller");

// PUBLIC (Website Contact Form)
router.post("/", ctrl.createEnquiry);

// ADMIN
router.get("/", auth, ctrl.listEnquiries);
router.put("/:id", auth, ctrl.updateEnquiry);
router.delete("/:id", auth, ctrl.deleteEnquiry);

// FOLLOW-UPS
router.post("/:id/followup", auth, ctrl.addFollowUp);
router.get("/:id/followup", auth, ctrl.getFollowUps);

// DASHBOARD
router.get("/dashboard/today-followups", auth, ctrl.todayFollowUps);

module.exports = router;

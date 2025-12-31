const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/notification.controller");

router.get("/", auth, ctrl.list);
router.get("/unread-count", auth, ctrl.unreadCount);
router.put("/:id/read", auth, ctrl.markRead);

module.exports = router;

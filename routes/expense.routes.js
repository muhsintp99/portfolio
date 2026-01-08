const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/expense.controller");

/* CRUD */
router.post("/", auth, ctrl.create);
router.get("/", auth, ctrl.list);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.remove);

/* SUMMARY */
router.get("/summary/monthly", auth, ctrl.monthlySummary);
router.get("/summary/category", auth, ctrl.categorySummary);

module.exports = router;

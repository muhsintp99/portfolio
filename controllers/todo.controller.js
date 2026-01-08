const Todo = require("../models/Todo.model");

/* CREATE */
exports.create = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json({ success: true, data: todo });
};

/* LIST */
exports.list = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json({ success: true, data: todos });
};

/* COUNT */
exports.count = async (req, res) => {
  const total = await Todo.countDocuments();
  res.json({ success: true, count: total });
};

/* UPDATE (EDIT) */
exports.update = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data: todo });
};

/* TOGGLE COMPLETED */
exports.toggle = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.completed = !todo.completed;
  await todo.save();

  res.json({ success: true, data: todo });
};

/* DELETE */
exports.remove = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Todo deleted" });
};

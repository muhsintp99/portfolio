const Todo = require("../models/Todo.model");

exports.create = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json({ success: true, data: todo });
};

exports.list = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json({ success: true, data: todos });
};

exports.toggle = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json({ success: true, data: todo });
};

exports.remove = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

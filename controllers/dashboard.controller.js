const Profile = require("../models/Profile.model");
const Expense = require("../models/Expense.model");
const Todo = require("../models/Todo.model");
const Note = require("../models/Note.model");

exports.getDashboardStats = async (req, res) => {
  try {
    // PROFILE
    const profile = await Profile.findOne();
    const profileCompleted = !!profile;

    // EXPENSE
    const totalExpenseAgg = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // MONTHLY EXPENSE
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const monthlyExpenseAgg = await Expense.aggregate([
      { $match: { date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const monthlyExpense = monthlyExpenseAgg[0]?.total || 0;

    // TODO
    const totalTodos = await Todo.countDocuments();
    const completedTodos = await Todo.countDocuments({ completed: true });
    const pendingTodos = await Todo.countDocuments({ completed: false });

    // NOTES
    const notesCount = await Note.countDocuments();

    res.json({
      success: true,
      data: {
        profileCompleted,
        expense: {
          total: totalExpense,
          monthly: monthlyExpense
        },
        todos: {
          total: totalTodos,
          completed: completedTodos,
          pending: pendingTodos
        },
        notes: notesCount
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const Profile = require("../models/Profile.model");
const Settings = require("../models/Settings.model");
const Expense = require("../models/Expense.model");
const Income = require("../models/Income.model");
const Todo = require("../models/Todo.model");
const Note = require("../models/Note.model");
const Enquiry = require("../models/Enquiry.model");
const Notification = require("../models/Notification.model");
const Blog = require("../models/Blog.model");

exports.getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const [
      profile,
      settings,

      // EXPENSE
      totalExpenseAgg,
      monthlyExpenseAgg,

      // INCOME
      totalIncomeAgg,
      monthlyIncomeAgg,

      // TODO
      totalTodos,
      completedTodos,
      pendingTodos,

      // NOTES
      notesCount,

      // ENQUIRY
      totalEnquiries,
      newEnquiries,
      followUpEnquiries,
      closedEnquiries,

      // NOTIFICATIONS
      unreadNotifications,

      // BLOG
      totalBlogs,
      publishedBlogs
    ] = await Promise.all([
      Profile.findOne(),
      Settings.findOne(),

      // EXPENSE
      Expense.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Expense.aggregate([
        { $match: { date: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),

      // INCOME
      Income.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Income.aggregate([
        { $match: { date: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),

      // TODO
      Todo.countDocuments(),
      Todo.countDocuments({ completed: true }),
      Todo.countDocuments({ completed: false }),

      // NOTES
      Note.countDocuments(),

      // ENQUIRY
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "New" }),
      Enquiry.countDocuments({ status: "Follow-Up" }),
      Enquiry.countDocuments({ status: "Closed" }),

      // NOTIFICATIONS
      Notification.countDocuments({ isRead: false }),

      // BLOG
      Blog.countDocuments(),
      Blog.countDocuments({ published: true })
    ]);

    // SAFE VALUES
    const totalExpense = totalExpenseAgg?.[0]?.total || 0;
    const monthlyExpense = monthlyExpenseAgg?.[0]?.total || 0;

    const totalIncome = totalIncomeAgg?.[0]?.total || 0;
    const monthlyIncome = monthlyIncomeAgg?.[0]?.total || 0;

    const budgetLimit = settings?.expense?.monthlyLimit || 0;
    const budgetEnabled = settings?.expense?.alertEnabled || false;

    res.json({
      success: true,
      data: {
        profile: {
          completed: !!profile
        },

        settings: {
          appName: settings?.appName || "Admin Dashboard",
          currency: settings?.currency || {
            code: "INR",
            symbol: "₹"
          }
        },

        expense: {
          total: totalExpense,
          monthly: monthlyExpense
        },

        income: {
          total: totalIncome,
          monthly: monthlyIncome
        },

        profitLoss: {
          total: totalIncome - totalExpense,
          monthly: monthlyIncome - monthlyExpense
        },

        budget: {
          enabled: budgetEnabled,
          limit: budgetLimit,
          exceeded:
            budgetEnabled &&
            budgetLimit > 0 &&
            monthlyExpense > budgetLimit
        },

        todos: {
          total: totalTodos,
          completed: completedTodos,
          pending: pendingTodos
        },

        notes: {
          total: notesCount
        },

        enquiries: {
          total: totalEnquiries,
          new: newEnquiries,
          followUp: followUpEnquiries,
          closed: closedEnquiries
        },

        notifications: {
          unread: unreadNotifications
        },

        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          draft: totalBlogs - publishedBlogs
        }
      }
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

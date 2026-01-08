const Profile = require("../models/Profile.model");
const Expense = require("../models/Expense.model");
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

      // EXPENSE
      totalExpenseAgg,
      monthlyExpenseAgg,

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
      // PROFILE
      Profile.findOne(),

      // EXPENSE
      Expense.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Expense.aggregate([
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

    res.json({
      success: true,
      data: {
        profile: {
          completed: !!profile
        },

        expense: {
          total: totalExpenseAgg[0]?.total || 0,
          monthly: monthlyExpenseAgg[0]?.total || 0
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
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

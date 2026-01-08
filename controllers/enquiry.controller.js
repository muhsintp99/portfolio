const Enquiry = require("../models/Enquiry.model");
const FollowUp = require("../models/FollowUp.model");
const Notification = require("../models/Notification.model");
const { sendEmail } = require("../utils/email");

/* CREATE (PUBLIC) */
exports.createEnquiry = async (req, res) => {
  const enquiry = await Enquiry.create(req.body);

  await Notification.create({
    title: "New Enquiry",
    message: `New enquiry from ${enquiry.name}`,
    type: "Enquiry",
    relatedId: enquiry._id
  });

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "New Enquiry Received",
    html: `
      <h3>New Enquiry</h3>
      <p><b>Name:</b> ${enquiry.name}</p>
      <p><b>Email:</b> ${enquiry.email}</p>
      <p><b>Phone:</b> ${enquiry.phone}</p>
      <p><b>Message:</b> ${enquiry.message}</p>
    `
  });

  res.json({ success: true, data: enquiry });
};

/* LIST (ADMIN) */
exports.listEnquiries = async (req, res) => {
  const data = await Enquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, data });
};

/* COUNT */
exports.count = async (req, res) => {
  const total = await Enquiry.countDocuments();
  res.json({ success: true, count: total });
};

/* GET ONE */
exports.getOne = async (req, res) => {
  const data = await Enquiry.findById(req.params.id);
  res.json({ success: true, data });
};

/* UPDATE STATUS / ASSIGN */
exports.updateEnquiry = async (req, res) => {
  const data = await Enquiry.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data });
};

/* DELETE */
exports.deleteEnquiry = async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  await FollowUp.deleteMany({ enquiryId: req.params.id });
  res.json({ success: true });
};

/* ADD FOLLOW-UP */
exports.addFollowUp = async (req, res) => {
  const followUp = await FollowUp.create({
    enquiryId: req.params.id,
    ...req.body
  });

  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    {
      status: "Follow-Up",
      nextFollowUpDate: req.body.followUpDate
    },
    { new: true }
  );

  await Notification.create({
    title: "Enquiry Follow-Up",
    message: `Follow-up scheduled for ${enquiry.name}`,
    type: "FollowUp",
    relatedId: enquiry._id
  });

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "Enquiry Follow-Up Scheduled",
    html: `
      <h3>Follow-Up Scheduled</h3>
      <p><b>Name:</b> ${enquiry.name}</p>
      <p><b>Date:</b> ${new Date(
        req.body.followUpDate
      ).toDateString()}</p>
      <p><b>Note:</b> ${req.body.note}</p>
    `
  });

  res.json({ success: true, data: followUp });
};

/* GET FOLLOW-UPS */
exports.getFollowUps = async (req, res) => {
  const data = await FollowUp.find({
    enquiryId: req.params.id
  }).sort({ followUpDate: -1 });

  res.json({ success: true, data });
};

/* DASHBOARD – TODAY FOLLOW-UPS */
exports.todayFollowUps = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const data = await Enquiry.find({
    nextFollowUpDate: { $gte: today, $lt: tomorrow }
  });

  res.json({ success: true, data });
};

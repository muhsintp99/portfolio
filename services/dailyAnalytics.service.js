const cron = require("node-cron");
const Enquiry = require("../models/Enquiry.model");
const { sendEmail } = require("../utils/email");

// 🕘 Runs every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  try {
    const total = await Enquiry.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCount = await Enquiry.countDocuments({
      createdAt: { $gte: today }
    });

    const closedCount = await Enquiry.countDocuments({ status: "Closed" });

    const conversionRate =
      total === 0 ? 0 : ((closedCount / total) * 100).toFixed(2);

    const followUpsToday = await Enquiry.countDocuments({
      nextFollowUpDate: { $gte: today }
    });

    // 📧 Send email
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "Daily Enquiry Analytics Report",
      html: `
        <h2>📊 Daily Enquiry Report</h2>
        <p><b>Total Enquiries:</b> ${total}</p>
        <p><b>Today's Enquiries:</b> ${todayCount}</p>
        <p><b>Conversion Rate:</b> ${conversionRate}%</p>
        <p><b>Follow-Ups Due Today:</b> ${followUpsToday}</p>
        <hr/>
        <p>Generated automatically by Pro Dashboard</p>
      `
    });

    console.log("✅ Daily analytics email sent");
  } catch (err) {
    console.error("❌ Daily analytics email failed", err.message);
  }
});

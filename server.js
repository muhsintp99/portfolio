require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

require("./config/db")();
require("./services/dailyAnalytics.service");

const app = express();

/* ======================================
   ✅ CORS CONFIG (ALLOW ALL ORIGINS)
====================================== */
app.use(
  cors({
    origin: (origin, callback) => {
      // allow all origins dynamically
      callback(null, true);
    },
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ======================================
   MIDDLEWARE
====================================== */
app.use(express.json());
app.use(cookieParser());

/* ======================================
   STATIC FILES
====================================== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ======================================
   ROUTES
====================================== */
app.use("/api/upload", require("./routes/upload.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/experience", require("./routes/experience.routes"));
app.use("/api/certificates", require("./routes/certificate.routes"));
app.use("/api/socials", require("./routes/social.routes"));
app.use("/api/expenses", require("./routes/expense.routes"));
app.use("/api/blogs", require("./routes/blog.routes"));
app.use("/api/notes", require("./routes/note.routes"));
app.use("/api/todos", require("./routes/todo.routes"));
app.use("/api/income", require("./routes/income.routes"));
app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/brand", require("./routes/brand.routes"));
app.use("/api/enquiries", require("./routes/enquiry.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));
app.use("/api/enquiry-analytics", require("./routes/enquiryAnalytics.routes"));
app.use("/api/enquiries-export", require("./routes/enquiryExport.routes"));

/* ======================================
   HEALTH CHECK ROUTES
====================================== */
app.get("/", (req, res) => {
  res.send(`
    <body style="margin:0;font-family: monospace;">
      <div style="background:black;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;color:bisque;">
        <h1>Welcome... 🚀</h1>
        <h2>Server running on port ${process.env.PORT}</h2>
      </div>
    </body>
  `);
});

app.get("/api", (_, res) => {
  res.json({
    status: "OK",
    message: "API is running 🚀",
    port: process.env.PORT,
  });
});

/* ======================================
   START SERVER
====================================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
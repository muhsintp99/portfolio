require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("./config/db")();
require("./services/dailyAnalytics.service");

const app = express();
app.use(express.json());
app.use(cookieParser());

// serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
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
app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/brand", require("./routes/brand.routes"));
app.use("/api/enquiries", require("./routes/enquiry.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));
app.use("/api/enquiry-analytics", require("./routes/enquiryAnalytics.routes"));
app.use("/api/enquiries-export", require("./routes/enquiryExport.routes"));

app.get("/", (req, res) => {
  res.send(`
    <body style="padding: 0; margin:0;font-family: monospace;">
    <div style="padding: 0; margin:0; background-color: black; display: flex; flex-direction: column; align-items: center;justify-content: center; height: 100vh; color: bisque;">
        <h1 style="padding: 0; margin:0;">Welcome... 🚀</h1>
        </br>
        <h2 style="padding: 0; margin:0;"> Server running on port ${process.env.PORT} </h2>
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

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

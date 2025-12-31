const Enquiry = require("../models/Enquiry.model");
const { Parser } = require("json2csv");

exports.exportCSV = async (req, res) => {
  const { status, from, to } = req.query;
  const filter = {};

  // filter by status
  if (status) {
    filter.status = status;
  }

  // filter by date range
  if (from && to) {
    filter.createdAt = {
      $gte: new Date(from),
      $lte: new Date(to)
    };
  }

  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

  const fields = [
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" },
    { label: "Source", value: "source" },
    { label: "Status", value: "status" },
    { label: "Next Follow Up", value: "nextFollowUpDate" },
    { label: "Message", value: "message" },
    { label: "Created At", value: "createdAt" }
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(enquiries);

  res.header("Content-Type", "text/csv");
  res.attachment("enquiries-report.csv");
  return res.send(csv);
};

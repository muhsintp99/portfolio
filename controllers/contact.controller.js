const Contact = require("../models/contact.model");

/* CREATE (PUBLIC – Contact Us Form) */
exports.create = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json({ success: true, data: contact });
};

/* LIST (ADMIN) */
exports.list = async (req, res) => {
  const data = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, data });
};

/* COUNT */
exports.count = async (req, res) => {
  const total = await Contact.countDocuments();
  res.json({ success: true, count: total });
};

/* GET ONE */
exports.getOne = async (req, res) => {
  const data = await Contact.findById(req.params.id);
  res.json({ success: true, data });
};

/* REPLY (ADMIN) */
exports.reply = async (req, res) => {
  const { reply } = req.body;

  const data = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      reply,
      replied: true,
      repliedAt: new Date()
    },
    { new: true }
  );

  res.json({ success: true, data });
};

/* DELETE (ADMIN) */
exports.remove = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

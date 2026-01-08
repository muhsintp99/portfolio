const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  issuer: String,
  year: String,
  credentialUrl: String
}, { timestamps: true });

module.exports = mongoose.model("Certificate", CertificateSchema);

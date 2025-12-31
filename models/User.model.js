const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  label: String,           // home, office, whatsapp
  value: String
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: { type: String, required: true },

  profileImage: String,

  contactNumber: String,

  address: String,

  refreshToken: String,

  contacts: [ContactSchema]   // multiple contacts
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);

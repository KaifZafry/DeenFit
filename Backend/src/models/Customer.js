const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: '', trim: true },
    email: { type: String, required: true, unique: true, trim: true, index: true },
    mobile: { type: String, default: '', trim: true },
    googleId: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);


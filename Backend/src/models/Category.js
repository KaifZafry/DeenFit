const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category_id: { type: Number, required: true, unique: true, index: true },
    category_title: { type: String, required: true, trim: true },
    category_image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);


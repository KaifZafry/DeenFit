const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema(
  {
    subcategory_id: { type: Number, required: true, unique: true, index: true },
    cid: { type: Number, required: true, index: true }, // category_id
    title: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subcategory', subcategorySchema);


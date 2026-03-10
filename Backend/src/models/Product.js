const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    product_id: { type: Number, required: true, unique: true, index: true },
    product_title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    selling_price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    category_id: { type: Number, required: true, index: true },
    subCategoryId: { type: Number, default: null, index: true },
    product_image: { type: String, default: '' }, // comma-separated filenames
    color: { type: String, default: '' },
    size: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);


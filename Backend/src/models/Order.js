const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    orderItemID: { type: String, required: true },
    productID: { type: Number, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    color: { type: String, default: '' },
    size: { type: String, default: '' },
    subtotal: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true, unique: true, index: true },
    orderDate: { type: Date, default: Date.now },
    userID: { type: String, required: true, index: true }, // customer _id as string
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, default: '' },
    orderItems: { type: [orderItemSchema], default: [] },
    totalAmount: { type: Number, required: true },
    currentStatus: { type: String, default: 'Pending' },
    payment: {
      provider: { type: String, default: '' },
      status: { type: String, default: '' }, // created | paid | failed
      razorpayOrderId: { type: String, default: '' },
      razorpayPaymentId: { type: String, default: '' },
    },
    statusHistory: {
      statusName: { type: String, default: 'Pending' },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);

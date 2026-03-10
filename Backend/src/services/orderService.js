const Counter = require('../models/Counter');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

async function createOrderFromCheckoutPayload(payload, options = {}) {
  const body = payload || {};
  const {
    userID,
    customerName,
    phone,
    shippingAddress,
    paymentMethod,
    orderItems = [],
  } = body;

  if (!userID || !customerName || !phone || !shippingAddress) {
    const err = new Error('Missing required fields');
    err.statusCode = 400;
    throw err;
  }
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    const err = new Error('orderItems is required');
    err.statusCode = 400;
    throw err;
  }

  const nextOrderNum = await Counter.next('order');
  const orderID = String(1000 + nextOrderNum);

  const mappedItems = orderItems.map((item, idx) => {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    return {
      orderItemID: `${orderID}-${idx + 1}`,
      productID: Number(item.productID),
      productName: String(item.productName || ''),
      quantity,
      price,
      color: item.color || '',
      size: item.size || '',
      subtotal: quantity * price,
    };
  });

  const totalAmount = mappedItems.reduce((sum, it) => sum + (Number(it.subtotal) || 0), 0);

  const payment = options.payment || null;
  const isPaid = payment?.status === 'paid';
  const currentStatus = isPaid ? 'Processing' : 'Pending';

  const created = await Order.create({
    orderID,
    userID: String(userID),
    customerName,
    phone,
    shippingAddress,
    paymentMethod: paymentMethod || (isPaid ? 'Razorpay' : ''),
    orderItems: mappedItems,
    totalAmount,
    currentStatus,
    statusHistory: { statusName: currentStatus, updatedAt: new Date() },
    ...(payment ? { payment } : {}),
  });

  const customer = await Customer.findById(String(userID)).lean();

  return {
    orderDoc: created,
    responseData: {
      status: 'succeed',
      orderId: created.orderID,
      date: created.orderDate.toISOString(),
      total: created.totalAmount,
      customer: {
        name: created.customerName,
        email: customer?.email || '',
        address: created.shippingAddress,
      },
      items: mappedItems.map((it) => ({ name: it.productName, qty: it.quantity, price: it.price })),
    },
  };
}

module.exports = { createOrderFromCheckoutPayload };


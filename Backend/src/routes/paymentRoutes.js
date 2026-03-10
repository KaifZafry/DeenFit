const express = require('express');
const https = require('https');
const crypto = require('crypto');

const { createOrderFromCheckoutPayload } = require('../services/orderService');

const router = express.Router();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    const err = new Error(
      `${name} is not set. Add it to Backend/.env and restart the backend (npm.cmd run dev).`
    );
    err.statusCode = 500;
    throw err;
  }
  return value;
}

function razorpayRequest(path, method, body, opts = {}) {
  const keyId = opts.keyId || process.env.RAZORPAY_KEY_ID;
  if (!keyId) {
    const err = new Error(
      'RAZORPAY_KEY_ID is not set. Add it to Backend/.env and restart the backend.'
    );
    err.statusCode = 500;
    throw err;
  }

  const keySecret = requireEnv('RAZORPAY_KEY_SECRET');
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const payload = body ? JSON.stringify(body) : '';

  const options = {
    hostname: 'api.razorpay.com',
    port: 443,
    path,
    method,
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let json = null;
        try {
          json = data ? JSON.parse(data) : null;
        } catch {
          // ignore
        }
        if (res.statusCode >= 200 && res.statusCode < 300) return resolve(json);
        let message = json?.error?.description || json?.error?.message || data || 'Razorpay error';
        if (res.statusCode === 401) {
          message =
            'Razorpay authentication failed (401). Check Backend/.env: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be from the same Test/Live key pair, then restart the backend.';
        }
        const err = new Error(message);
        err.statusCode = res.statusCode;
        reject(err);
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

// Create Razorpay order from checkout payload
router.post('/razorpay/order', async (req, res) => {
  try {
    const { orderPayload } = req.body || {};
    if (!orderPayload) return res.status(400).json({ status: 'failed', message: 'orderPayload is required' });

    const items = orderPayload.orderItems || [];
    const total = items.reduce((sum, it) => {
      const q = Number(it.quantity) || 0;
      const p = Number(it.price) || 0;
      return sum + q * p;
    }, 0);

    const amountPaise = Math.max(0, Math.round(total * 100));
    if (!amountPaise) return res.status(400).json({ status: 'failed', message: 'Amount must be > 0' });

    const envKeyId = requireEnv('RAZORPAY_KEY_ID');
    const receipt = `rcpt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const rpOrder = await razorpayRequest(
      '/v1/orders',
      'POST',
      {
        amount: amountPaise,
        currency: 'INR',
        receipt,
        payment_capture: 1,
      },
      { keyId: envKeyId }
    );

    return res.json({
      status: 'succeed',
      keyId: envKeyId,
      razorpayOrderId: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
    });
  } catch (err) {
    const code = err.statusCode || 500;
    return res.status(code).json({ status: 'failed', message: err.message });
  }
});

// Verify Razorpay signature and create Mongo order
router.post('/razorpay/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderPayload } = req.body || {};
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderPayload) {
      return res.status(400).json({ status: 'failed', message: 'Missing required fields' });
    }

    const keySecret = requireEnv('RAZORPAY_KEY_SECRET');
    const expected = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ status: 'failed', message: 'Invalid signature' });
    }

    const { responseData } = await createOrderFromCheckoutPayload(orderPayload, {
      payment: {
        provider: 'razorpay',
        status: 'paid',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      },
    });

    return res.json(responseData);
  } catch (err) {
    const code = err.statusCode || 500;
    return res.status(code).json({ status: 'failed', message: err.message });
  }
});

module.exports = router;

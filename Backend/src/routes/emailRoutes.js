const express = require('express');

const router = express.Router();

// Frontend OTP is generated client-side; this endpoint just acknowledges the request.
router.post('/send', async (req, res) => {
  const { email, subject } = req.body || {};
  if (!email) return res.status(400).json('Email is required');
  // Intentionally no SMTP integration here; wire Nodemailer/SendGrid later if needed.
  console.log('[Email/send] requested', { email, subject });
  return res.json('OTP sent');
});

module.exports = router;


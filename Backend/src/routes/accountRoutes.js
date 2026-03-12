const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

const Counter = require('../models/Counter');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const { createOrderFromCheckoutPayload } = require('../services/orderService');

const router = express.Router();

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

function hasCloudinaryConfig() {
  return (
    Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
    Boolean(process.env.CLOUDINARY_API_KEY) &&
    Boolean(process.env.CLOUDINARY_API_SECRET)
  );
}

function ensureCloudinaryConfigured() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

function ensureUploadsDir() {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
}

function sniffExtension(buffer) {
  if (buffer.length >= 4) {
    // PNG: 89 50 4E 47
    if (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    )
      return 'png';
    // JPEG: FF D8
    if (buffer[0] === 0xff && buffer[1] === 0xd8) return 'jpg';
    // GIF: 47 49 46
    if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) return 'gif';
    // WEBP: RIFF....WEBP
    if (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer.length >= 12 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    )
      return 'webp';
  }
  return 'jpg';
}

function saveBase64Image(base64Data) {
  ensureUploadsDir();
  const normalized = String(base64Data || '')
    .replace(/^data:[^;]+;base64,/, '')
    .trim();
  const buffer = Buffer.from(normalized, 'base64');
  const ext = sniffExtension(buffer);
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`;
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);
  return filename;
}

async function uploadBase64ToCloudinary(base64Data) {
  ensureCloudinaryConfigured();
  const normalized = String(base64Data || '')
    .replace(/^data:[^;]+;base64,/, '')
    .trim();
  const buffer = Buffer.from(normalized, 'base64');
  const ext = sniffExtension(buffer);
  const dataUri = `data:image/${ext};base64,${normalized}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: process.env.CLOUDINARY_FOLDER || 'deenfit',
    resource_type: 'image',
  });

  return result.secure_url;
}

// Upload (base64) -> returns filenames that frontends treat as "URLs"
router.post('/uploadfile', async (req, res) => {
  try {
    const { docBase64List } = req.body || {};
    if (!Array.isArray(docBase64List) || docBase64List.length === 0) {
      return res.status(400).json({ status: 'failed', message: 'docBase64List is required' });
    }

    if (docBase64List.some((x) => typeof x !== 'string' || x.trim().length === 0)) {
      return res.status(400).json({ status: 'failed', message: 'docBase64List must contain base64 strings' });
    }

    const urls = hasCloudinaryConfig()
      ? await Promise.all(docBase64List.map(uploadBase64ToCloudinary))
      : docBase64List.map(saveBase64Image);

    return res.json({
      status: 'succeed',
      message: 'Uploaded',
      requestnumber: urls.join(','),
      urls,
    });
  } catch (err) {
    return res.status(500).json({ status: 'failed', message: err.message || 'Upload failed' });
  }
});

// Auth for user panel (email based)
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, mobile, googleId } = req.body || {};
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const normalizedEmail = String(email).trim().toLowerCase();
    let customer = await Customer.findOne({ email: normalizedEmail });
    if (!customer) {
      customer = await Customer.create({
        fullName: fullName || '',
        email: normalizedEmail,
        mobile: mobile || '',
        googleId: googleId || '',
      });
    } else {
      // Best-effort enrichment on re-register
      const update = {};
      if (fullName && !customer.fullName) update.fullName = fullName;
      if (mobile && !customer.mobile) update.mobile = mobile;
      if (googleId && !customer.googleId) update.googleId = googleId;
      if (Object.keys(update).length) await Customer.updateOne({ _id: customer._id }, update);
    }

    return res.json({ message: 'Registered', userId: String(customer._id) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const normalizedEmail = String(email).trim().toLowerCase();
    const customer = await Customer.findOne({ email: normalizedEmail });
    if (!customer) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'Login successful', userId: String(customer._id) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Categories
router.get('/getcategory', async (_req, res) => {
  const data = await Category.find({}).sort({ category_id: 1 }).lean();
  res.json({ status: 'succeed', data });
});

router.post('/addcategory', async (req, res) => {
  try {
    const { title, image } = req.body || {};
    if (!title) return res.status(400).json({ status: 'failed', message: 'title is required' });
    const category_id = await Counter.next('category');
    const created = await Category.create({
      category_id,
      category_title: title,
      category_image: image || '',
    });
    res.json({ status: 'succeed', data: created });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

router.post('/updatecategory', async (req, res) => {
  try {
    const { id, title, image } = req.body || {};
    if (!id) return res.status(400).json({ status: 'failed', message: 'id is required' });
    const updated = await Category.findOneAndUpdate(
      { category_id: Number(id) },
      {
        ...(title !== undefined ? { category_title: title } : {}),
        ...(image !== undefined ? { category_image: image } : {}),
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ status: 'failed', message: 'Category not found' });
    res.json({ status: 'succeed', data: updated });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

router.post('/deletecategory/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await Category.deleteOne({ category_id: id });
    await Subcategory.deleteMany({ cid: id });
    await Product.deleteMany({ category_id: id });
    res.json({ status: 'succeed' });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

// Subcategories (admin uses lowercase /api/account/* too; Express routing is case-insensitive by default)
router.get('/getsubcategory', async (_req, res) => {
  const data = await Subcategory.find({}).sort({ subcategory_id: 1 }).lean();
  res.json({ status: 'succeed', data });
});

router.get('/getsubcategory/:cid', async (req, res) => {
  const cid = Number(req.params.cid);
  const data = await Subcategory.find({ cid }).sort({ subcategory_id: 1 }).lean();
  res.json({ status: 'succeed', data });
});

router.post('/addsubcategory', async (req, res) => {
  try {
    const { cid, title, image } = req.body || {};
    if (!cid || !title) {
      return res.status(400).json({ status: 'failed', message: 'cid and title are required' });
    }
    const subcategory_id = await Counter.next('subcategory');
    const created = await Subcategory.create({
      subcategory_id,
      cid: Number(cid),
      title,
      image: image || '',
    });
    res.json({ status: 'succeed', data: created });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

router.post('/updatesubcategory/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { cid, title, image } = req.body || {};
    const updated = await Subcategory.findOneAndUpdate(
      { subcategory_id: id },
      {
        ...(cid !== undefined ? { cid: Number(cid) } : {}),
        ...(title !== undefined ? { title } : {}),
        ...(image !== undefined ? { image } : {}),
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ status: 'failed', message: 'Subcategory not found' });
    res.json({ status: 'succeed', data: updated });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

router.post('/deletesubcategory/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await Subcategory.deleteOne({ subcategory_id: id });
    res.json({ status: 'succeed' });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

// Products
router.get('/getallproducts', async (_req, res) => {
  const data = await Product.find({}).sort({ product_id: -1 }).lean();
  res.json({ status: 'succeed', data });
});

router.get('/getproductsbycategory/:categoryId', async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  const data = await Product.find({ category_id: categoryId }).sort({ product_id: -1 }).lean();
  res.json({ status: 'succeed', data });
});

router.get('/getproductbycategory', async (req, res) => {
  const categoryId = Number(req.query.id);
  const data = await Product.find({ category_id: categoryId }).sort({ product_id: -1 }).lean();
  res.json({ status: 'succeed', data });
});

router.post('/addproduct', async (req, res) => {
  try {
    const body = req.body || {};
    if (!body.title || body.cid === undefined) {
      return res.status(400).json({ status: 'failed', message: 'title and cid are required' });
    }

    const product_id = await Counter.next('product');
    const created = await Product.create({
      product_id,
      product_title: body.title,
      description: body.description || '',
      price: Number(body.price) || 0,
      discount: Number(body.discount) || 0,
      selling_price: Number(body.selling_price) || 0,
      quantity: Number(body.quantity) || 0,
      rating: Number(body.rating) || 0,
      category_id: Number(body.cid),
      subCategoryId: body.scid !== undefined && body.scid !== null && body.scid !== '' ? Number(body.scid) : null,
      product_image: body.image || '',
      color: body.color || '',
      size: body.size || '',
    });
    res.json({ status: 'succeed', data: created });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

router.post('/updateproduct', async (req, res) => {
  try {
    const body = req.body || {};
    const id = Number(body.id);
    if (!id) return res.status(400).json({ status: 'failed', message: 'id is required' });

    const updated = await Product.findOneAndUpdate(
      { product_id: id },
      {
        ...(body.title !== undefined ? { product_title: body.title } : {}),
        ...(body.description !== undefined ? { description: body.description } : {}),
        ...(body.price !== undefined ? { price: Number(body.price) || 0 } : {}),
        ...(body.discount !== undefined ? { discount: Number(body.discount) || 0 } : {}),
        ...(body.selling_price !== undefined ? { selling_price: Number(body.selling_price) || 0 } : {}),
        ...(body.quantity !== undefined ? { quantity: Number(body.quantity) || 0 } : {}),
        ...(body.rating !== undefined ? { rating: Number(body.rating) || 0 } : {}),
        ...(body.cid !== undefined ? { category_id: Number(body.cid) } : {}),
        ...(body.scid !== undefined
          ? {
              subCategoryId:
                body.scid !== null && body.scid !== '' ? Number(body.scid) : null,
            }
          : {}),
        ...(body.image !== undefined ? { product_image: body.image } : {}),
        ...(body.color !== undefined ? { color: body.color } : {}),
        ...(body.size !== undefined ? { size: body.size } : {}),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ status: 'failed', message: 'Product not found' });
    res.json({ status: 'succeed', data: updated });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

router.post('/deleteproduct/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await Product.deleteOne({ product_id: id });
    res.json({ status: 'succeed' });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

// Orders
router.post('/placeorder', async (req, res) => {
  try {
    const { responseData } = await createOrderFromCheckoutPayload(req.body, {
      payment: { provider: '', status: 'created' },
    });
    return res.json(responseData);
  } catch (err) {
    const code = err.statusCode || 500;
    return res.status(code).json({ status: 'failed', message: err.message });
  }
});

router.get('/getAllOrdersByUserId/:userId', async (req, res) => {
  try {
    const userId = String(req.params.userId);
    const orders = await Order.find({ userID: userId }).sort({ orderDate: -1 }).lean();
    const data = orders.map((o) => ({
      orderID: o.orderID,
      orderDate: o.orderDate.toISOString(),
      customerName: o.customerName,
      phone: o.phone,
      totalAmount: o.totalAmount,
      paymentMethod: o.paymentMethod,
      shippingAddress: o.shippingAddress,
      statusHistory: { statusName: o.currentStatus },
      orderItems: o.orderItems.map((it) => ({
        orderItemID: it.orderItemID,
        productName: it.productName,
        quantity: it.quantity,
        subtotal: it.subtotal,
      })),
    }));
    res.json({ status: 'succeed', data });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
});

router.get('/getorderbyid/:orderId', async (req, res) => {
  try {
    const orderId = String(req.params.orderId).trim();
    const order = await Order.findOne({ orderID: orderId }).lean();
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({
      orderID: order.orderID,
      currentStatus: order.currentStatus,
      orderDate: order.orderDate,
      customerName: order.customerName,
      phone: order.phone,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      orderItems: order.orderItems,
      totalAmount: order.totalAmount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

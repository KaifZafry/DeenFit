const express = require('express');
const connectDB= require('./config/database')
const cors= require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptimeSeconds: process.uptime(),
    mongoState: String(require('mongoose').connection.readyState), // 1 = connected
    time: new Date().toISOString(),
  });
});


// Static files (product/category images)
app.use(
  '/ServiceProduct',
  express.static(path.join(__dirname, '..', 'uploads'), { fallthrough: true })
);

// API routes (kept to match existing frontend calls)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/Account', require('./routes/accountRoutes'));
app.use('/api/Email', require('./routes/emailRoutes'));
app.use('/api/Payment', require('./routes/paymentRoutes'));

// JSON error handler (prevents frontend "Unexpected end of JSON")
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ status: 'failed', message: err.message || 'Internal Server Error' });
});

connectDB()
.then(()=>{
    console.log('your database has been connected')
    app.listen(7000, ()=> console.log('your app is listening on port 7000'))
})
.catch((err)=>{
    console.log('connection failed ' + err.message)
    console.error(err.stack);
})

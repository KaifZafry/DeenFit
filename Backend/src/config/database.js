const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to db');
  } catch (error) {
    console.error('connection error: ' + error.message);
    throw error;
  }
}

mongoose.set('debug', true);
module.exports = connectDB

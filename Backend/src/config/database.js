const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async ()=>{
   
    await mongoose.connect(process.env.MONGODB_URI, {

    }).then(()=>{
        console.log('connected to db')
    }).catch((error)=>{
        console.error('connection error' + error)
    })
}

mongoose.set('debug', true);
module.exports = connectDB
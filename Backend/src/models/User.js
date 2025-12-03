const mongoose = require('mongoose')
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:100
    }
})

userSchema.methods.getJWT= function(){
    user= this;
    const token= jwt.sign({id:user._id}, process.env.JWT_SECRET)
    console.log(token)

    return token
}

userSchema.methods.validatePassword= function(){
    user = this
    const hashedPassword= user.password;

    const ispasswordValid= bcrypt.compare(userInputPassword,hashedPassword)
    return ispasswordValid
}

const userModel = mongoose.model('User', userSchema);

module.exports= userModel;
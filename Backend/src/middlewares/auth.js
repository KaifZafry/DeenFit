const express= require('express')
require('dotenv').config;
const User= require('../models/User')

const userAuth = async(req,res,next)=>{

    try{
        const {token}= req.cookies;
        if(!token){
            throw new error ("token not found")
        }
        const decodeobj = jwt.verify(token, process.env.JWT_SECRET);
        const {_id}= decodeobj;
        const user = User.findbyId(_id);
        if(!user){
            throw new error ("user not found")
        }
        next()
    }
    catch(err){
        res.status(400).send("error:" + err.message)
    }

}

module.exports= {userAuth}
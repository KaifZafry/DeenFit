const express = require('express');
const jwt= require('jsonwebtoken');
const User = require('../models/User')


const router= express.Router();

const generateToken=(user)=>{
    return jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})  
}


//register api
router.post('/register', async (req,res)=>{
    try{
        const {userName,email,password}= req.body;

        const exist= await User.findOne({email})
        if(exist) return res.status(400).json({msg: "email already exist"})

        const user = await User.create({userName,email,password});
        const token = generateToken(user);
        res.json({msg:"Registered", token,user})
    }
    catch(err){
        console.log(err.message)
    }
})


//login routes
router.post('/login', async(req,res)=>{

    try{
        const {email,password}= req.body;
        const user = User.findOne({email});
        if(!user) return res.status(404).json({msg:'user not found'});
        const isMatch= await User.comparePassword(password);

        if(isMatch){
            const token = generateToken(user);
            res.send({message: "login successful",user,token})
        }else{
            res.status(400).send({ message: "Invalid password" });
        }
    }
    catch{
         console.log(err.message)
    }

})

module.exports= router;
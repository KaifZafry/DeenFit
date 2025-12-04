const express = require('express');
const jwt= require('jsonwebtoken');
const User = require('../models/User')
const bcrypt= require('bcryptjs')


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
        const hashedPassword= await bcrypt.hash(password,10);

        const newUser = await User.create({userName,email,password:hashedPassword});
        const token = generateToken(newUser);
        newUser.save();
        console.log("user saved successfully", newUser)
        res.json({msg:"Registered", token,newUser})
    }
    catch(err){
        console.log(err.message)
    }
})


//login routes
router.post('/login', async(req,res)=>{

    try{
        const {email,password}= req.body;

        //email check for exist
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({msg:'user not found'});


        //validate password 
        const isMatch= await user.validatePassword(password);

        if(isMatch){
            const token = generateToken(user);
            res.send({message: "login successful",user,token})
        }else{
            res.status(400).send({ message: "Invalid password" });
        }
    }
    catch(err){
         console.log(err.message)
    }

})

router.delete('/logout', async(req,res)=>{
    res.clearCookie('token');
    res.send({message:"logout successfull"})
})
module.exports= router;
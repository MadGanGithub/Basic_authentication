import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import router from "./user_routes.js";
// import auth from "../middleware/auth.js";
const demo_route=express.Router();

//signup page
demo_route.post("/",async(req,res)=>{

    try{
    
    //validation
    const{email,password}=req.body;
    console.log(email)
    
    
    if(!email || !password){
        return res.status(400).json({message:"Please fill all the fields!!"});
    }

    if(password.length<8){
        return res.status(400).json({ message: "Enter atleast more than 8 characters" })
    }

    const existingUser=await User.findOne({email:email});
    if(existingUser){
        console.log("EXISTS")
        return res.status(400).json({message:"Account already exists!!"})
        
    }
    

    //hash the password
    const salt=await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(password,salt);


    //save the user
    const newUser=new User({
        email,passwordHash
    });

    const savedUser=await newUser.save();

    //create a token
    const token=jwt.sign({
        userInfo:savedUser._id,
    },process.env.JWT_SECRET);
    console.log(token)

    //send the token to cookie
    res.cookie("token",{
        httpOnly:true,
    }).send();

    console.log("Signup successful")

    }catch(err){
        console.log(err)
        res.status(500).json({message:"error"});
        

    }

    //login

    demo_route.post("/login",async(req,res)=>{
        try{
            const{email,password}=req.body;

            if(!email || !password){
                return res.status(400).json({message:"Please fill all the fields!!"});
            }
            //To check valid email id
            const existingUser=await User.findOne({email:email});
            if(!existingUser){
                console.log("NOT EXISTS")
                return res.status(400).json({message:"Account does not exist.Please try again!!"})
                
            }

            //To check valid password or not
            const passwordCheck=await bcrypt.compare(password,existingUser.passwordHash);
            if(!passwordCheck){
                console.log("Password is incorrect")
                return res.status(400).json({message:"Password is incorrect"})
            }

            //Till now the user is authenticated

             //create a token
             const token=jwt.sign({
                userInfo:existingUser._id,
            },process.env.JWT_SECRET);
            console.log(token)

            //send the token to cookie
            res.cookie("token",token,{
                httpOnly:true,
            }).send();

            console.log("Login successful")


        }catch(err){
            console.log(err)
            res.status(500).json({message:"error"});
            
    
        }
    });

    //loggedIn

    demo_route.get("/loggedIn",(req,res)=>{
        try{
            console.log("test0")
            const token=req.cookies.token
            console.log("test1")
            if(!token){
                return res.json(false)
            }
    
            jwt.verify(token,process.env.JWT_SECRET)
            res.send(true)
          

        }catch(err){
            console.log(err)
            res.json(false)
        }
    });

    //logout
    demo_route.get("/logout",(req,res)=>{
        try{
            res.cookie("token","",{
                httpOnly:true,
                expires:new Date(0),
            }).send();
        }catch(err){
            res.json(err)
        }
        
    });

    demo_route.get("/shit",(req,res)=>{
        try{
            console.log("shit get")
            
        }catch(err){
            res.json("unauthorized")
        }
    })

});



export default demo_route;
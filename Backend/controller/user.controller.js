import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from 'bcryptjs'
import createTokenAndSaveCookies from "../jwt/AuthToken.js"

//here we write logic for the given Usermodel
export const register = async (req, res) => {
try {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ message: "User photo is required" });
  }
  const { photo } = req.files;
  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedFormats.includes(photo.mimetype)) {
    return res
      .status(400)
      .json({ message: "Invalid photo format.Only jpg and png are allowed" });
  }
  const { name, email, phone, password, education, role } = req.body; //getting data from signup/register api
  // console.table([name,email,phone,password,role,education])

  if (!email || !name || !phone || !password || !education || !role || !photo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: "User already exists with this email" });
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    photo.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(cloudinaryResponse.error);
    return res.status(500).json({ message: "Failed to upload photo" });
  }

  const hashedPassword = await bcrypt.hash(password,10)
  const newUser = new User({
    email,
    name,
    password:hashedPassword,
    phone,
    education,
    role,
    photo: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    },
  });
  await newUser.save();
  if (newUser) {
    const token= await createTokenAndSaveCookies(newUser._id, res)
    console.log("SignUp:",token)
     return res.status(201).json({ message: "user registered successfully", newUser,token:token });
  }
} catch (error) {
  console.log(error)
   return res.status(500).json({error:"Internal Server error"})
}
};

//login user
export const login=async(req,res)=>{
  const {email,password,role} = req.body
 
  try {
    if(!email ||!password ||!role){
      return res.status(400).json({message: 'Please fill required fields'})
    }
    const user = await User.findOne({ email }).select("password role");
    console.log(user)
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

     // Ensure password is a string
     if (typeof password !== 'string' || typeof user.password !== 'string') {
      return res.status(400).json({ message: "Invalid password format" });
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!user ||!isMatch){
      return res.status(400).json({message:"Invalid email or password"})
    }
    if(user.role!==role){
      return res.status(400).json({message:`Given role ${role} not found`})
    }
    const token = await createTokenAndSaveCookies(user._id, res)
    console.log("loginToken: ",token)
    res.status(200).json({ message: "user logged in successfully", user:{
      _id:user._id,
      name:user.name,
      email:user.email,
      role:user.role
    },token:token});

  } catch (error) {
    console.log(error)
    return res.status(500).json({error:"Internal server error"})
  }
}

export const logout=(req,res)=>{
 try {
  res.clearCookie('jwt',{httpOnly:true});
  res.status(200).json({message:"User logged out successfully"})
 } catch (error) {
  console.log(error)
  return res.status(500).json({error:"Internal Server error"})
 }
}

export const getMyProfile = async(req,res)=>{
  const user = await req.user;
  res.status(200).json(user)
}

export const getAdmins = async(req,res)=>{
  const admins = await User.find({role:"admin"})
  res.status(200).json(admins);
}

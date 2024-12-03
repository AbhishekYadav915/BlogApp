import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import blogRoute from './routes/blog.route.js'

import fileUpload from 'express-fileupload'
import {v2 as cloudinary} from "cloudinary"
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

dotenv.config()

const port = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URI
// console.log(MONGODB_URL)

//middleWare
app.use(express.json())
app.use(cookieParser());

// app.use(cors())
app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true, // If sending cookies/auth headers
  }));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
    // createParentPath:true,
    // limits:{fileSize:100000}
}))


try {
    mongoose.connect(MONGODB_URL)
    console.log("Connected to MongoDB")
} catch (error) {
    console.log(error)
}

//defining routes
app.use("/api/users",userRoute);
app.use("/api/blogs",blogRoute);


//Cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});


app.listen(port,()=>{
    console.log(`server is running on port number :${port}`)
})
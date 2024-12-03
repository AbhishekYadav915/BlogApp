import mongoose from "mongoose";

//creating blogSchema
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  blogImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minLength:[200,"Should contain atleast 200 Character"]
  },
 adminName:{
    type:String,
    // required:true,
 },
 adminPhoto:{
    type:String,
    // required:true,
 },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref:"User",
  },
});

export const Blog = mongoose.model("Blog", blogSchema);

//Admin(Employee) Model Schema

import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
         type:String,
         required:true
    }

})

export const Admin = mongoose.model("Admin",adminSchema);

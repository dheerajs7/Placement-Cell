import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
// import { asyncHandler } from "../utils/asyncHandler.js";


function isEmployeeEmail(email) {
    return email.endsWith('@cn.com');
}

const signUpAdmin = async(req,res)=>{

    const {name,email,password} = req.body;

    if (!isEmployeeEmail(email)) {
        res.status(400).json(
            { message: "Not authorised to signup"}
         )
      }
   
    const ifAdminExist = await Admin.findOne({email})

    if (ifAdminExist) {
       return res.status(400).json(
           { message: "Admin already exist"}
        )
    }
    if (password.length < 8) {
       return res.status(401).json(
            {message:"Password must be at least 8 characters long",success:false}
        )
      }
   
      const hashedPassword = await bcrypt.hash(password,10)

     const admin =new Admin({
        name,
        email,
        password:hashedPassword
     })

     await admin.save()

     return res.status(201).json({admin, message:"User registered successfully"})
}

const loginAdmin = async(req,res)=>{
try{
    const {email,password} =req.body;
    const validAdmin = await Admin.findOne({email})
    
    if (!validAdmin) {
      return  res.status(404).json(
            {
                message:"Please Register first!"
            }
        )
    }

    const validPassword = await bcrypt.compare(password,validAdmin.password)

    if (!validPassword) {
   return res.status(403).json({message:"Password does not match!!"})
        
    }
    const token = jwt.sign({id:validAdmin._id},process.env.JWT_SECRET)
    
     
    res.cookie("access_token",token,{httpOnly:true}).status(201).json({message:"User Logged in Successfully",validAdmin})
}
catch(err){
    res.status(401).json({
        message:"Error logging in"
    })
}
}

const logout =(req,res)=>{
    try {
        res.clearCookie("access_token")

        res.status(200).json({
            message: "Admin logged out successfully",
        })
    } catch (error) {
        res.status(401).json({
            message:"error logging out"
    })
}
}
export {signUpAdmin,loginAdmin,logout}
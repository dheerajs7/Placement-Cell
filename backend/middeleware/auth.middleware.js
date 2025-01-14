import jwt from "jsonwebtoken"


//Middeleware function ot authenticate valid  user
const isAuthenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.access_token

        if(!token){
            return res.status(401).json({
               message:"Unauthorized"
            })
        }

        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
               
            return res.status(403).json({
                message:"Forbidden"
             })
        }
        req.user =user
        next();
    })
    } catch (error) {
        console.log(error)
    }
}

export {isAuthenticate}
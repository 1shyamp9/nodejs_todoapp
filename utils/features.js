import jwt from "jsonwebtoken"

export const createCookie = (user,res,message,status=200)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRATE)
    res.status(status).cookie('token',token,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite: process.env.NODE_ENV==="Delevopment" ? "lax":"none" ,
        secure:process.env.NODE_ENV==="Delevopment" ? false:true
    }).json({
        success: true,
        message,
    })
}
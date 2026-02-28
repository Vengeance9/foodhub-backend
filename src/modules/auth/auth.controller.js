import { Request, Response } from "express";
import { authService } from "./auth.services";


const signUp = async(req, res) => {
    try{
        const result = await authService.signUp(req.body)
        return res.json({
            success:true,
            message:"Signup successful",
            data:result
        })
    }catch(error){
        return res.json({
            success:false,
            message:error.message,
        })
    }
}
const login = async(req, res) => {
    const result = await authService.login(req.body)

    res.cookie("token", result.token, {
        secure:false,
        httpOnly:true,
        sameSite:"strict"
    })
    return res.json({
        success:true,
        message:"Login successful",
        data:result
    })
};

const getMe = async (req, res) => {
  const user = req.user?.id
    if(!user){
        return res.json(null)
    }
    const me = await authService.getMe(user)
  return res.json(me);
};


export const authController = {login,signUp,getMe}

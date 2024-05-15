import jwt from "jsonwebtoken";
import { userModel } from "../../DB/model/user.js";
export const auth=(acessRole=[])=>{
    return async(req,res,next)=>{
        try{
            const {token}=req.headers;
            if(!token.startsWith(process.env.authBearerToken)){
                return res.status(400).json({message:"invalid token"})
            }
            const newtoken=token.split(process.env.authBearerToken)[1];
            const decoded=jwt.verify(newtoken,process.env.TokenSignIn)
            const user=await userModel.findById(decoded.id)
            if(!user){
                return res.status(400).json({message:"invalid "})
            }
            if(!acessRole.includes(user.role)){
                return res.status(400).json({message:'not auth user'})
            }
            req.user=user;
            next();
        }catch(error){
            return res.status(400).json({message:`catch error ${error}`})
        }
    }

    }


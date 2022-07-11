import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const authorization=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try{
        if(req.headers.authorization?.split(' ')[1]){
            const token=req.headers.authorization.split(' ')[1];
            const decode=jsonwebtoken.verify(token,(process.env.SECRET_KEY as unknown) as string);
            if(decode){
                next();
            }else{
                res.json(`try to login first`);
            }
        }else{
            res.json(`try to login first`);
        }
    }catch(err){
        res.json(`try to login first ,${err}`);
    }
    
    
}
export default authorization;
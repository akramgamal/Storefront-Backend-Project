import { users_model } from './../models/users';
import express from "express"

const user=new users_model;
const getAllUsers=async (req:express.Request,res:express.Response)=>{
    const data=await user.index();
    res.json(data);
}
const getUser=async(req:express.Request,res:express.Response)=>{
    try{
        const id:Number=parseInt(req.params.id);
        const data=await user.show(id);
        res.json(data);
    }catch(err){
     res.json(err);
    }
}
const addUser=async(req:express.Request,res:express.Response)=>{
    try{
        const firstname:string=req.body.firstname;
        const lastname:string=req.body.lastname;
        const password:string=req.body.password;
        const data=await user.create({firstname,lastname,password});
        res.json(data);
    }catch(err){
        res.json(err);
    }
}
const updateUser=async(req:express.Request,res:express.Response)=>{
    try{
        const id:Number = parseInt(req.params.id);
        const firstname:string=req.body.firstname;
        const lastname:string=req.body.lastname;
        const password:string=req.body.password;
        const data=await user.update({id,firstname,lastname,password});
        res.json(data);
    }catch(err){
        res.json(err);
    }
}
const deleteUser=async(req:express.Request,res:express.Response)=>{
    try{
        const id:Number=parseInt(req.params.id);
        const data=await user.delete(id);
        res.json(data);
    }catch(err){
     res.json(err);
    }
}

const authenticate=async(req:express.Request,res:express.Response)=>{
    try{
        const firstname:string=req.body.firstname;
        const lastname:string=req.body.lastname;
        const password:string=req.body.password;
        const data=await user.authenticate({firstname,lastname,password});
        res.json(data);
    }catch(err){
     res.json(err);
    }
}
export { getAllUsers ,getUser,addUser,updateUser,deleteUser,authenticate};

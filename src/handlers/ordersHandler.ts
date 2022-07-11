import { orders_model } from './../models/orders';
import express from "express"
const order=new orders_model;

const orders_ByUser=async (req:express.Request,res:express.Response)=>{
    try{
        const user_id:Number=parseInt(req.params.id);
        const data=await order.orders_ByUser(user_id);
        res.json(data);
    }catch(err){
        res.json(err);
    }
    
}
const getOrder=async(req:express.Request,res:express.Response)=>{
    try{
        const user_id:Number=parseInt(req.params.id);
        const data=await order.current_order(user_id);
        res.json(data);
    }catch(err){
     res.json(err);
    }
}
const addOrder=async(req:express.Request,res:express.Response)=>{
    try{
        const status:string=req.body.status;
        const user_id:Number=req.body.user_id;
        const data=await order.create({status,user_id});
        res.json(data);
    }catch(err){
        res.json(err);
    }
}
const updateOrder=async(req:express.Request,res:express.Response)=>{
    try{
        const id:Number = parseInt(req.params.id);
        const status:string=req.body.status;
        const user_id:Number=req.body.user_id;
        const data=await order.update({id,status,user_id});
        res.json(data);
    }catch(err){
        res.json(err);
    }
}
const deleteOrder=async(req:express.Request,res:express.Response)=>{
    try{
        const id:Number=parseInt(req.params.id);
        const data=await order.delete(id);
        res.json(data);
    }catch(err){
     res.json(err);
    }
}
const addProduct=async(req:express.Request,res:express.Response)=>{
    try{
        const order_id:Number = parseInt(req.params.id);
        const product_id:Number=req.body.product_id;
        const quantity:Number=req.body.quantity;
        const data=await order.addProduct({order_id,product_id,quantity});
        res.json(data);
    }catch(err){
        res.json(err);
    }
    
}
export { orders_ByUser ,getOrder,addOrder,updateOrder,deleteOrder,addProduct};

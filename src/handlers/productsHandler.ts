import { products_model } from './../models/products';
import express from "express"
const product=new products_model;
const getAllProducts=async (req:express.Request,res:express.Response)=>{
    const data=await product.index();
    res.json(data);
}
const getProduct=async(req:express.Request,res:express.Response)=>{
    try{
        const id:Number=parseInt(req.params.id);
        const data=await product.show(id);
        res.json(data);
    }catch(err){
     res.json(err);
    }
}
const addProduct=async(req:express.Request,res:express.Response)=>{
    try{
        const name:string=req.body.name;
        const price:Number=req.body.price;
        const category:string=req.body.category;
        const data=await product.create({name,price,category});
        res.json(data);
    }catch(err){
        res.json(err);
    }
}
const updateProduct=async(req:express.Request,res:express.Response)=>{
    try{
        const id:Number = parseInt(req.params.id);
        const name:string=req.body.name;
        const price:Number=req.body.price;
        const category:string=req.body.category;
        const data=await product.update({id,name,price,category});
        res.json(data);
    }catch(err){
        res.json(err);
    }
}
const deleteProduct=async(req:express.Request,res:express.Response)=>{
    try{
        const id:Number=parseInt(req.params.id);
        const data=await product.delete(id);
        res.json(data);
    }catch(err){
     res.json(err);
    }
}
export { getAllProducts ,getProduct,addProduct,updateProduct,deleteProduct};

import express, {Request, Response } from 'express'
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../handlers/productsHandler';
import authorization from '../utilities/authenticate_validation';


const productRoute =express.Router();
productRoute.get('/hello',(req:Request,res:Response)=>{
    res.send("hello kimo");
})

productRoute.get('/products',getAllProducts);
productRoute.get('/products/:id',getProduct);
productRoute.post('/products',authorization,addProduct);
productRoute.put('/products/:id',authorization,updateProduct);
productRoute.delete('/products/:id',authorization,deleteProduct);
export default productRoute;
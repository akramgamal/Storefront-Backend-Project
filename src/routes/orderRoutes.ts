import express from 'express'
import { addOrder, addProduct, deleteOrder, getOrder, orders_ByUser, updateOrder } from '../handlers/ordersHandler';
import authorization from '../utilities/authenticate_validation';



const orderRoute =express.Router();

orderRoute.get('/order/:id',authorization,getOrder);
orderRoute.get('/orders/:id',authorization,orders_ByUser);
orderRoute.post('/order',authorization,addOrder);
orderRoute.put('/order/:id',authorization,updateOrder);
orderRoute.delete('/order/:id',authorization,deleteOrder);
orderRoute.post('/order/:id/products',authorization,addProduct);
export default orderRoute;
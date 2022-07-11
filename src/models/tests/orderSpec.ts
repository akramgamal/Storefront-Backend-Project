import { products_model } from '../products';
import { users_model } from '../users';
import { orders_model } from '../orders';

const order=new orders_model;
const users=new users_model;
const product=new products_model;
describe("orders_model",():void=>{
    it('should have an orders_ByUser method', () => {
        expect(order.orders_ByUser).toBeDefined();
      });
    
      it('should have a current_order method', () => {
        expect(order.current_order).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(order.create).toBeDefined();
      });
    
      it('should have an update method', () => {
        expect(order.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(order.delete).toBeDefined();
      });
      it('should have an addProduct method', () => {
        expect(order.addProduct).toBeDefined();
      });
      
        it("create method should add new order",async()=>{
        const customer=await users.create({
            firstname:"akram",
            lastname:"gamal",
            password:"123"
        });
        const data=await order.create({
            status:"complete",
            user_id:1
        });
        expect(data).toEqual({
            id:1,
            status:"complete",
            user_id:1
        })
        });
        it("orders_ByUser method should show all complete orders for specific user",async()=>{
            const data=await order.orders_ByUser(1);
            expect(data).toEqual([{
                id:1,
                status:"complete",
                user_id:1
            }])
            });
        it("current_order method should show active order",async()=>{
            await order.create({
                status:"active",
                user_id:1
            });
            const data=await order.current_order(1);
                expect(data).toEqual({
                    id:2,
                    status:"active",
                    user_id:1
                });
        });
        it("update method should update order",async()=>{
            const data=await order.update({
                id:1,
                status:"active",
                user_id:1
            });
            expect(data).toEqual({
                id:1,
                status:"active",
                user_id:1
            });
     });
     it("delete method should delete one order",async()=>{
        await order.create({
            status:"complete",
            user_id:1
        });
        await order.delete(3);
        const data=await order.orders_ByUser(1);
        expect(data).toEqual([]);
     });
     it("addProduct method should add product to order",async()=>{
        await product.create({
            name:"apple",
            price:2000,
            category:"lap"
        });
        const data=await order.addProduct({
            quantity:20,
            product_id:1,
            order_id:1
        });
        expect(data).toEqual({
            id:1,
            quantity:20,
            product_id:1,
            order_id:1
        });
     });
});
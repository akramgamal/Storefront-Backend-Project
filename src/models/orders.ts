import client from "../database";
type order={
    id? :Number,
    status: string,
    user_id :Number,
}
type order_product={
    id? :Number,
    quantity :Number,
    order_id:Number,
    product_id:Number
}
export class orders_model{
    async orders_ByUser(id:Number):Promise<order[]>{
        try{
            const conn=await client.connect();
            const sql=`select * from orders where status='complete' and user_id=${id}`;
            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`couldn't show all orders . ${err}`)
        }
     
    }
    async current_order(id:Number):Promise<order|string>{
        try{
           const conn=await client.connect();
           const sql=`select * from orders where status='active' and user_id=${id}`;
           const result=await conn.query(sql);
           conn.release();
           if(result.rows.length)return  result.rows[0];
           else return `order is not found`;
        }catch(err){
          throw new Error(`couldn't find the required order ${id} . ${err}`);
        }
       }
    async create(ord:order):Promise<order|string>{
        try{
            const conn=await client.connect();
            const find_user=`select * from users where id=${ord.user_id}`;
            const found=await conn.query(find_user); 
            conn.release();
            if(found.rows.length>0){
                const conn=await client.connect();
                const sql=`insert into orders(status,user_id) values('${ord.status}',${ord.user_id}) returning *`;
                const result=await conn.query(sql); 
                conn.release();
                return result.rows[0];
            }else{ return `the order is not added`;}
        }catch(err){
            throw new Error(`couldn't add this order. ${err}`)
        }
       
    }
    async update(ord:order):Promise<order|string>{
        try{
            const conn=await client.connect();
            const sql=`update orders set status='${ord.status}',user_id=${ord.user_id} where id=${ord.id} returning *`;
            const result=await conn.query(sql);
            conn.release();
            if(result.rowCount>0) return result.rows[0];
            else return `the order is not updated`;
        }catch(err){
            throw new Error(`couldn't update this order. ${err}`)
        }
        
    }
    async delete(id:Number):Promise<order|string>{
        try{
            const conn=await client.connect();
            const sql=`delete from orders where id=${id} returning *`;
            const result=await conn.query(sql);
            conn.release();
            if(result.rowCount>0) return result.rows[0];
            else return `the order ${id} is not found`;
        }catch(err){
            throw new Error(`couldn't delete this order ${id} . ${err}`);
        }
       
    }
    async addProduct(make_order:order_product):Promise<order_product>{
        try{
         const conn= await client.connect();
         const find_order=`select * from orders where id=${make_order.order_id}`;
         const find_product=`select * from products where id=${make_order.product_id}`;
         const result= await conn.query(find_order);
         const result2= await conn.query(find_product);
         if(result.rows.length==0){
            throw new Error('order is not found')
         }else if(result2.rows.length==0){
            throw new Error('product is not found')
         }
         if(result.rows[0].status!=='active'){
            throw new Error(`order ${make_order.id} is not active`)
         }
         conn.release();
        }catch(err){
            throw new Error(`${err}`);
        }
       try{
        const conn= await client.connect();
        const sql=`insert into order_product(quantity,order_id,product_id) values(${make_order.quantity},${make_order.order_id},${make_order.product_id}) returning *`
        const result=await conn.query(sql);
        conn.release();
        return result.rows[0];
       }catch(err){
        throw new Error(`the product is not added to the order${err}`);
       }
    }
    async delete_order_product(id:Number):Promise<order|string>{
        try{
            const conn=await client.connect();
            const sql=`delete from order_product where id=${id} returning *`;
            const result=await conn.query(sql);
            conn.release();
            if(result.rowCount>0) return result.rows[0];
            else return `the order ${id} is not found`;
        }catch(err){
            throw new Error(`couldn't delete this order ${id} . ${err}`);
        }
       
    }
}
export default orders_model;
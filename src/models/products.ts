import client from "../database";
type product={
    id? :Number,
    name: string,
    price :Number,
    category :string
}
export class products_model{
    async index():Promise<product[]>{
        try{
            const conn=await client.connect();
            const sql="select * from products";
            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`couldn't show all products . ${err}`)
        }
     
    }
    async show(id:Number):Promise<product|string>{
     try{
        const conn=await client.connect();
        const sql=`select * from products where id=${id}`;
        const result=await conn.query(sql);
        conn.release();
        if(result.rows.length)return  result.rows[0];
        else return `product is not found`;
     }catch(err){
       throw new Error(`couldn't find the required product ${id} . ${err}`);
     }
      
    }
    async create(prod:product):Promise<product|string>{
        try{
            const conn=await client.connect();
            
            const sql=`insert into products(name,price,category) values('${prod.name}',${prod.price},'${prod.category}') returning *`;
            const result=await conn.query(sql); 
            conn.release();
            if(result.rowCount>0) return result.rows[0];
            else return `the item ${prod.name} not added`;
        }catch(err){
            throw new Error(`couldn't add this product ${prod.name} . ${err}`)
        }
       
    }
    async update(prod:product):Promise<product|string>{
        try{
            const conn=await client.connect();
            const sql=`update products set name='${prod.name}',price=${prod.price},category='${prod.category}' where id=${prod.id} returning *`;
            const result=await conn.query(sql);
            conn.release();
            if(result.rowCount>0) return result.rows[0];
            else return `the item ${prod.name} is not updated`;
        }catch(err){
            throw new Error(`couldn't update this product ${prod.name} . ${err}`)
        }
        
    }
    async delete(id:Number):Promise<product|string>{
        try{
            const conn=await client.connect();
            const sql=`delete from products where id=${id} returning *`;
            const result=await conn.query(sql);
            conn.release();
            if(result.rowCount>0) return result.rows[0];
            else return `the item ${id} is not found`;
        }catch(err){
            throw new Error(`couldn't delete this product ${id} . ${err}`);
        }
       
    }
}
export default products_model;
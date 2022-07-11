import client from "../database";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
dotenv.config();
export type user={
    id? :Number,
    firstname: string,
    lastname :string,
    password: string
}
export class users_model{
    async index():Promise<user[]>{
        try{
            const conn=await client.connect();
            const sql="select * from users";
            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`couldn't show all users . ${err}`)
        }
     
    }
    async show(id:Number):Promise<user|string>{
     try{
        const conn=await client.connect();
        const sql=`select * from users where id=${id}`;
        const result=await conn.query(sql);
        conn.release();
        if(result.rows.length)return  result.rows[0];
        else return `user is not found`;
     }catch(err){
       throw new Error(`couldn't find the required user ${id} . ${err}`);
     }
      
    }
    async create(customer:user):Promise<user|string>{
        try{
            const conn=await client.connect();
            const hash= bcrypt.hashSync(customer.password, parseInt((process.env.SALT_ROUNDS as unknown) as string));
            //const hash2=customer.password;
            const sql=`insert into users(firstname,lastname,password) values('${customer.firstname}','${customer.lastname}','${hash}') returning *`;
            const result=await conn.query(sql); 
            conn.release();
            if(result.rowCount>0) return result.rows[0];
            else return `user ${customer.firstname} is not added`;
        }catch(err){
            throw new Error(`couldn't add this user ${customer.firstname} . ${err}`)
        }
       
    }
    async update(customer:user):Promise<user|string>{
        try{
            const conn=await client.connect();
            const sql=`update users set firstname='${customer.firstname}',lastname='${customer.lastname}',password='${customer.password}' where id=${customer.id} returning *`;
            const result=await conn.query(sql);
            conn.release();
            if(result.rowCount>0)  return result.rows[0];
            else return `the user ${customer.firstname} is not updated`;
        }catch(err){
            throw new Error(`couldn't update this user ${customer.firstname} . ${err}`)
        }
        
    }
    async delete(id:Number):Promise<user|string>{
        try{
            const conn=await client.connect();
            const sql=`delete from users where id=${id} returning *`;
            const result=await conn.query(sql);
            conn.release();
            if(result.rowCount>0) return result.rows[0];
            else return `the user ${id} is not found`;
        }catch(err){
            throw new Error(`couldn't delete this user ${id} . ${err}`);
        }
       
    }
    async authenticate(customer:user):Promise<string>{
        try{
          const conn=await client.connect();
          const find_user=`select * from users where firstname='${customer.firstname}' and lastname='${customer.lastname}'`;
          const result=await conn.query(find_user);
          conn.release();
          if(result.rows.length){
            const data=result.rows[0];
            const isAuthenticated=bcrypt.compareSync(customer.password,data.password);
            if(isAuthenticated){
                const token=jsonwebtoken.sign(data,(process.env.SECRET_KEY as unknown) as string);
                console.log(token);
                return `you're successfully logged in`;
            }else{
                return `wrong name or password please try again`;
            }
          }else{
            return `cannot find user with this name`;
          }
          
        }catch(err){
            throw new Error(`couldn't login ${err}`);
        }
    }
}
export default users_model;
import dotenv from 'dotenv'
import {Pool} from 'pg'
dotenv.config();
const {USER_NAME,DATABASE_NAME,PASSWORD,HOST,ENV,DATABASE_TEST_NAME}=process.env;
let client:Pool;
client=new Pool({
user:USER_NAME,
database:ENV==='dev'?DATABASE_NAME:DATABASE_TEST_NAME,
password:PASSWORD,
host:HOST
});


export default client;
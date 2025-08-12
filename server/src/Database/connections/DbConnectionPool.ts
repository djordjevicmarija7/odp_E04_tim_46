import dotenv from "dotenv"
import mysql, {Pool} from "mysql2/promise"

dotenv.config();

const dbConfig={
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_PASSWORD as string,
    port: Number(process.env.DB_PORT),
    ssl:{
        rejectUnauthorized: false
    },
};
const db: Pool=mysql.createPool(dbConfig);

export default db;

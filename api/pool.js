import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
    user: "postgres",
    password:"root",
    host:"localhost",
    port:5432,
    database:"sm_diplom"
})

export default pool;
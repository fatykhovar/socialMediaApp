import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
    user: "postgres",
    password:"root",
    host:"localhost",
    port:5432,
    database:"sm_diplom",
    // connectionString: process.env.DATABASE_URL || 'postgresql://postgres:<root>@localhost:5432/<sm_diplom>',
    // ssl: true,
    // onError: (err, client) => {
    //   console.error("Unexpected error on idle client", err);
    //   client.query("ROLLBACK", (err) => {
    //     if (err) {
    //       console.error("Error rolling back client", err.stack);
    //     }
    //   });
    // },
    // onConnect: (client) => {
    //   client.query("SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL READ COMMITTED");
    //   client.query("SET SESSION TIME ZONE 'UTC'");
    //   client.query("SET ON_ERROR_STOP TO true"); // Automatically stop queries when an error occurs
    // },
})

export default pool;
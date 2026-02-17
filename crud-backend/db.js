import pg from "pg"
import dotenv from "dotenv"
// had to call dotenv.config in here so that it could connect the second time else it wouldn't connect
dotenv.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD
});

const connectDB = async() => {
    try {
        await db.connect();
        console.log("POSTGRES CONNECTED SUCCESFULLY")
    } catch (error) {
        console.log("ERROR CONNECTING TO POSTGRES");
        process.exit(1);
    }
}

connectDB();



db.on('error', (err)=> {
    console.error("Error in the database during session");
    process.exit(-1);
})

export const query = (text, params) => db.query(text, params);

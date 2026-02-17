import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import empRoutes from "./routes/empRoutes.js"


dotenv.config()//import so you can use dotenv

const app = express();//make a const called app thatstores the express

app.use(cors())
app.use(express.json())//allows it to read the json requests and responses

const port = process.env.PORT

app.use("/api/emp", empRoutes)

app.listen(port, () => {
    console.log("listening on port 5001")
})
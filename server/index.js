import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user_routes.js";
import demoRoutes from "./routes/demo_routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import cors from "cors";

//Settings
dotenv.config()
const app=express();
const PORT=process.env.PORT
const URL=process.env.URL

//Middlewares
app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}))

//Routes setup
app.use("/auth",demoRoutes);


//Database connection
mongoose.connect("mongodb+srv://Username:9nJ5kO4qi5X9Zygz@cluster9.yf0eu1l.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("Connected to mongoDB"))
.catch((err)=>console.log(err))


app.listen(PORT,()=>{
    console.log("Started..........`")
})
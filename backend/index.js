import express from "express"
import {PORT, MONGODBURL} from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js"
import cors from "cors"

const app = express();

//middleware for handling CORS policy
//option 1: allow all origins
app.use(cors());
//option 2: allow custom origins
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods:['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'], 
// }))

//middleware for parsing our request
app.use(express.json())

app.get("/", (req, res)=>{
  console.log(req);
  return res.status(234).send("HELLO")
  
})

app.use('/books', booksRoutes)



mongoose.connect(MONGODBURL)
.then(()=>{
  console.log("App connected to database");
  app.listen(PORT, ()=>{
    console.log(`App is listening to port: ${PORT}`);
    
  })
})
.catch((error)=>{
  console.log(error);
  
})
// require('dotenv').config({
//     path : './env',
// })
// As soon as possible import the dot env config
// but the problem that require and import together are inconsistent so we will import for better use

import connectDB from "./db/index.js";
import dotenv from "dotenv";

import { app } from "./app.js";


dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    //  listen krne se pehle app.on krke error bhi check kr skte h
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MONOGODB connection failed ! ! !`, err);
  });

// import express from 'express'

// const app = express()

// ( async() =>{

//     try {
//       await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
//   app.on("errror", (error) =>{
//     console.log("err:",error);
//     throw error
//   })

//   app.listen(process.env.PORT,()=>{
//     console.log(`App is listening on port ${process.env.PORT}`)
//   })

//     } catch (error) {
//         console.error("Error :",error)
//     }

// } )()

import mongoose from "mongoose"

import { DB_name } from "../constants.js"
const connectDB = async () => {
  

    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
        console.log(` \n MONGODB IS CONNECTED ! !  DB Host ${connectionInstance.connection.host}`)
      
        
    } catch (error) {
        console.error("MONGODB connection Failed HEHE",error);
        process.exit(1);
    }
}
export default connectDB
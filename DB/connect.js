import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config(
    {
        path:"./c.env"
    }
)
const connectDB=async()=>{
   
    // console.log(process.env.MONGO_URI);
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}}/${"movies"}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  
}

export{connectDB}
import mongoose from "mongoose";


 const connectDB = async() => {
    try {
        console.log("MONGODB_URL:", process.env.MONGODB_URL);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        
    } catch (error) {
        console.error("Mongodb connection error",error)
        process.exit(1);
    }
}

export default connectDB
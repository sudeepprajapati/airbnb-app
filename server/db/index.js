import mongoose from "mongoose"

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
     
        console.log(`\n MongoDB Connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB
import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Mongodb DataBase Connected")
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;
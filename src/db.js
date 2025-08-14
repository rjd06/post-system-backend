import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected Successfully : ", connectionInstance.connection);
    } catch (error) {
        console.log("MongoDB Connection Failed : ", error.message);
    }
};


export default connectDB;
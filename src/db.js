import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully : ", connectionInstance.connection.port);
    } catch (error) {
        console.log("MongoDB Connection Failed : ", error.message);
    }
};


export  {connectDB};
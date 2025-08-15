import mongoose from 'mongoose';


const connectDB = async () => {
// console.log(process.env.MONGO_URI)

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully : ", conn.connection.port);
    } catch (error) {
        console.log("MongoDB Connection Failed : ", error.message);
    }
};


export  {connectDB};
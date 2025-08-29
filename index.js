import { configDotenv } from "dotenv";
import express from "express";
import cors from 'cors';
import {connectDB} from "./src/db.js"
import postRoutes from './src/routes/post.routes.js'
import {notFound, errorHandler} from "./src/middleware/error.js";
import authRoutes from "./src/routes/auth.routes.js";

configDotenv();
 connectDB();
 
//  console.log(process.env.MONGO_URI)
const app = express();

// ✅ Allow your Vercel frontend
app.use(cors({
  origin: ["https://blackpost.vercel.app"], // your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({limit: "2mb"}));
app.use(express.urlencoded({extended: true}));


app.get("/", (_req, res)=>res.send("API OK"));
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, ()=>console.log(`Server running on http://localhost:${process.env.PORT}`));

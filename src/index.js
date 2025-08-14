import { configDotenv } from "dotenv";
import express from "express";
import cors from 'cors';
import {connectDB} from "./db"
import postRoutes from './routes/post.routes'
import {notFound, errorHandler} from "./middleware/error.js";


configDotenv();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json({limit: "2mb"}));
app.use(express.urlencoded({extended: true}));


app.get("/", (_req, res)=>res.send("API OK"));
app.use("/api/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, ()=>console.log(`Server running on http://localhost:${process.env.PORT}`));

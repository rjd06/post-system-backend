import { Router } from "express";
import {protect} from "../middleware/auth.js"
import {upload } from "../services/cloudinary.js";
import { createPost, getPosts, getPostById, likeToggle, addComment } from "../controllers/post.controller.js";

const r = Router();

r.get("/", getPosts);
r.get("/:id" , getPostById);
r.post("/", protect, upload.single("media"), createPost);
r.patch("/:id/like", protect, likeToggle);
r.post("/:id/comments", protect, addComment);

export default r;
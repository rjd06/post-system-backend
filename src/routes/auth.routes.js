// src/routes/auth.routes.js
import { Router } from "express";
import { register, login, me, authLimiter } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";

const r = Router();

r.post("/register", authLimiter, register);
r.post("/login", authLimiter, login);
r.get("/me", protect, me);

export default r;

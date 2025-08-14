// src/controllers/auth.controller.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import rateLimit from "express-rate-limit";

const sign = (user) =>
  jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const authLimiter = rateLimit({ windowMs: 60_000, max: 30 });

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "password must be at least 6 characters" });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const user = await User.create({ name, email, password, avatar });
  const token = sign(user);
  const safe = user.toObject(); delete safe.password;

  res.status(201).json({ user: safe, token });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "email and password are required" });

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = sign(user);
  const safe = user.toObject(); delete safe.password;

  res.json({ user: safe, token });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).lean();
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
});

// src/middleware/auth.js
import jwt from "jsonwebtoken";

export const protect = (req, _res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) throw new Error("No token provided");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id, name: decoded.name };
    next();
  } catch (e) {
    e.statusCode = 401;
    next(e);
  }
};

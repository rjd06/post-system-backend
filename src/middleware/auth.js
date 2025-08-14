import jwt from "jsonwebtoken";

export const protect = (req, _res, next)=>{
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

    if(!token) return next(new Error("No token"));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            _id: decoded.id,
            name: decoded.name || "User"
        };
        next();
    } catch (error) {
        next(new Error("Invalid token"));
    }
};
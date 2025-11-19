import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new Error("No token provided");

        const token = authHeader.split(" ")[1];
        if (!token) throw new Error("Invalid token format");

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: " + err.message });
    }
}

import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt.js";

export function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.split(" ")[1];

    try {
        const user = jwt.verify(token, JWT_CONFIG.accessSecret);
        req.user = user; // token ichidagi user id/role
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

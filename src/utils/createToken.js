import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt.js";

export function createTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_CONFIG.accessSecret, {
        expiresIn: JWT_CONFIG.accessExpires,
    });

    const refreshToken = jwt.sign(payload, JWT_CONFIG.refreshSecret, {
        expiresIn: JWT_CONFIG.refreshExpires,
    });

    return { accessToken, refreshToken };
}
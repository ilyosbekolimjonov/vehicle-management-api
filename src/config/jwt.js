import dotenv from "dotenv"
dotenv.config()

export const JWT_CONFIG = {
    accessSecret: process.env.ACCESS_SECRET,
    refreshSecret: process.env.REFRESH_SECRET,
    accessExpires: process.env.ACCESS_EXPIRES || "15m",
    refreshExpires: process.env.REFRESH_EXPIRES || "7d",
}
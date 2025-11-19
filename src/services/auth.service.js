import bcrypt from "bcrypt";
import knex from "../db/knex.js";
import { generateOtp, saveOtp, sendOtpToEmail } from "./otp.service.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt.js";


export async function register({ email, username, password, role }) {
    // 1. Check existing user
    const existing = await knex("users").where({ email }).first();
    if (existing) {
        throw new Error("User already exists with this email");
    }

    // 2. Hash password
    const hash = await bcrypt.hash(password, 10);

    // 3. Create user
    const [user] = await knex("users")
        .insert({
            email,
            username,
            password: hash,
            role,
            status: "inactive",
        })
        .returning("*");

    // 4. Generate OTP
    const code = generateOtp();

    // 5. Save OTP in DB
    await saveOtp(user.id, code);

    // 6. Send OTP email
    await sendOtpToEmail(user.email, code);

    return { userId: user.id };
}

export async function verifyOtp({ email, code }) {
    // 1. User exists?
    const user = await knex("users").where({ email }).first();
    if (!user) {
        throw new Error("User not found");
    }

    // 2. Find OTP record
    const otpRecord = await knex("otps")
        .where({ user_id: user.id, code, is_used: false })
        .orderBy("created_at", "desc")
        .first();

    if (!otpRecord) {
        throw new Error("Invalid OTP");
    }

    // 3. Check expiry
    if (new Date() > otpRecord.expires_at) {
        throw new Error("OTP expired");
    }

    // 4. Mark OTP as used
    await knex("otps")
        .where({ id: otpRecord.id })
        .update({ is_used: true });

    // 5. Activate user
    await knex("users")
        .where({ id: user.id })
        .update({ status: "active" });

    return { success: true };
}

export async function resendOtp({ email }) {
    // 1. User exists?
    const user = await knex("users").where({ email }).first();
    if (!user) {
        throw new Error("User not found");
    }

    if (user.status === "active") {
        throw new Error("User already verified");
    }

    // 2. Generate new code
    const code = generateOtp();

    // 3. Save in DB
    await saveOtp(user.id, code);

    // 4. Send via email
    await sendOtpToEmail(user.email, code);

    return { success: true };
}

export async function login({ email, password }) {
    // 1. User check
    const user = await knex("users").where({ email }).first();
    if (!user) {
        throw new Error("User not found");
    }

    // 2. Status check
    if (user.status !== "active") {
        throw new Error("User is not verified. Please verify OTP first.");
    }

    // 3. Password check
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Invalid password");
    }

    // 4. Generate tokens
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

    // 5. Refresh tokenni DB ga saqlaymiz
    await knex("users")
        .where({ id: user.id })
        .update({ refresh_token: refreshToken });

    return {
        accessToken,
        refreshToken,
    };
}

export async function myProfile(userId) {
    const user = await knex("users")
        .select("id", "email", "username", "role", "status", "created_at")
        .where({ id: userId })
        .first();

    return user;
}

export async function refreshToken(refreshToken) {
    if (!refreshToken) {
        throw new Error("Refresh token required");
    }

    // 1. DB dan refresh_token topamiz
    const user = await knex("users").where({ refresh_token: refreshToken }).first();
    if (!user) {
        throw new Error("Invalid refresh token");
    }

    // 2. Verify token
    let decoded;
    try {
        decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new Error("Refresh token expired");
    }

    // 3. Yangi access token yaratamiz
    const newAccessToken = generateAccessToken({
        id: decoded.id,
        role: decoded.role,
    });

    // 4. Xohlasa refresh token qayta yaratiladi (recommended)
    const newRefreshToken = generateRefreshToken({
        id: decoded.id,
        role: decoded.role,
    });

    // 5. DBga refresh tokenni update
    await knex("users")
        .where({ id: user.id })
        .update({ refresh_token: newRefreshToken });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
}

export async function logout(userId, refreshToken) {
    // DB dagi token bilan kelgan token mos kelishi shart
    const user = await knex("users").where({ id: userId }).first();

    if (user.refresh_token !== refreshToken) {
        throw new Error("Invalid refresh token");
    }

    await knex("users")
        .where({ id: userId })
        .update({ refresh_token: null });

    return true;
}

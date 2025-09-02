import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const sql = "INSERT INTO Users (name, email, password, credits) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(sql, [name, email, hash, 30]);

    const id = result.insertId;
    const accessToken = generateAccessToken({ name, email, id });
    const refreshToken = generateRefreshToken({ id, email });

    const [newUser] = await db.execute("SELECT credits FROM Users WHERE id = ?", [id]);
    const credits = newUser[0].credits;

    res.cookie("token", accessToken, { httpOnly: true, secure: false, sameSite: "None" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "None" });

    return res.status(201).json({ status: "Success", user: { name, email, id, credits } });
  } catch (err) {
    console.error("Register error:", err.message);
    if (err.message.includes("for key 'users.email'"))
      return res.status(409).json({ error: "Email already registered!" });
    if (err.message.includes("for key 'users.name'"))
      return res.status(409).json({ error: "Name already taken!" });
    return res.status(500).json({ error: "Account already exists" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.execute("SELECT * FROM Users WHERE email = ?", [email]);
    if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { id, name, credits } = rows[0];
    const accessToken = generateAccessToken({ id, email, name });
    const refreshToken = generateRefreshToken({ id, email });

    res.cookie("token", accessToken, { httpOnly: true, secure: false, sameSite: "Lax" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "Lax" });

    return res.status(200).json({ status: "Success", user: { name, email, id, credits } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "Lax" });
  res.clearCookie("refreshToken", { httpOnly: true, secure: false, sameSite: "Lax" });
  return res.json({ Status: "Success" });
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid refresh token" });

    const [rows] = await db.execute("SELECT name FROM Users WHERE id = ?", [user.id]);
    const name = rows[0].name;

    const newAccessToken = generateAccessToken({ id: user.id, email: user.email, name });
    res.cookie("token", newAccessToken, { httpOnly: true, secure: false, sameSite: "Lax" });
    return res.json({ status: "Success" });
  });
};

export const getUser = async (req, res) => {
  const [rows] = await db.execute("SELECT credits FROM Users WHERE id = ?", [req.id]);
  const credits = rows[0].credits;
  return res.json({ Status: "Success", name: req.name, email: req.email, id: req.id, credits });
};

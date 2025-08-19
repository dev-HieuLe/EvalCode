import express from "express";
import { register, login, logout, refreshToken, getUser } from "../controllers/authControllers.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyUser, getUser);
router.get("/logout", logout);
router.post("/refresh-token", refreshToken);

export default router;

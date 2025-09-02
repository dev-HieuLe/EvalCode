import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import batchRoutes from "./routes/batchRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://evalcode.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/", authRoutes);
app.use("/batches", batchRoutes);
app.use("/batches/:batchId/students", studentRoutes);
app.use("/ai", aiRoutes);
app.use("/export", exportRoutes);
app.use("/chatbot", chatbotRoutes);

app.get("/server", (req, res) => {
  res.send("Server is running and connected to the database!");
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});

// routes/chatbot.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(message);

    const reply = result.response.text();
    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ reply: "⚠️ Sorry, I had trouble responding." });
  }
});

export default router;

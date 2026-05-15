import express from "express";
import ai, { AI_MODEL } from "../config/ai.js";

const router = express.Router();

const SYSTEM_PROMPT = `
You are Eval AI, the in-app assistant for EvalCode — an AI-powered grading platform for educators.
Help users understand the product (batches, AI feedback, rubrics, credits, exports), answer general
coding-education questions, and keep replies concise. If something isn't related to EvalCode or
coding education, politely steer the conversation back. Never invent customer testimonials or
performance metrics — EvalCode is a new product.
`.trim();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Please send a message." });
  }

  try {
    const completion = await ai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.6,
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I didn't catch that — could you rephrase?";

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ reply: "⚠️ Sorry, I had trouble responding." });
  }
});

export default router;

import { GoogleGenerativeAI } from "@google/generative-ai";
import db from "../config/db.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateFeedback = async (req, res) => {
  const { batchId, studentId } = req.params;

  try {
    const { code } = req.body; // 👈 receive from frontend
    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }
    // 1. Get batch config
    const [batchRows] = await db.execute(
      "SELECT * FROM batches WHERE id = ? AND user_id = ?",
      [batchId, req.id]
    );
    if (batchRows.length === 0)
      return res.status(404).json({ error: "Batch not found or unauthorized" });
    const batch = batchRows[0];

    // 2. Get student code
    const [studentRows] = await db.execute(
      "SELECT * FROM students WHERE id = ? AND batch_id = ?",
      [studentId, batchId]
    );
    if (studentRows.length === 0)
      return res.status(404).json({ error: "Student not found" });
    const student = studentRows[0];

    // 3. Build prompt
    const prompt = `
You are an experienced and supportive coding teacher. 
Your role is to review and grade a student's code submission in a way that feels human, empathetic, and constructive.

Batch settings:
- Title: ${batch.title}
- Instructions: ${batch.instructions}
- Grading criteria: ${batch.grading_criteria}
- Language: ${batch.language}
- Feedback tone: ${batch.feedback_tone}
- Max points: ${batch.total_points}

Student's code:
${code}

Instructions for feedback:
1. If the code is mostly correct but has small syntax/formatting mistakes, keep your feedback short, direct, and encouraging.
2. If the code has logic errors, misunderstandings, or shows gaps in knowledge, explain clearly what went wrong, why it matters, and suggest what the student should review or practice.
3. Always keep the tone supportive and professional, as if you are guiding the student to improve.
4. End with a clear scoring suggestion in this exact format on a new line:
5. If the code is correct, you can simply say:
"Great job! Your code is correct and meets the requirements."
6. If the code is too long or too complex, try to skip minors error and just says it like revise back, but majors errors explain it. In case of too much majors errors, says that the students not meet criteria and summarize the errors but not explain it.
   Suggested Score: [number between 0 and ${batch.total_points}]
`;


    // 4. Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const aiFeedback = result.response.text();

    // 5. Save feedback to DB (optional)
    await db.execute(
      "UPDATE students SET ai_feedback = ? WHERE id = ?",
      [aiFeedback, studentId]
    );

    res.json({ feedback: aiFeedback });
  } catch (err) {
    console.error("❌ AI generation failed:", err);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
};

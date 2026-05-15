import db from "../config/db.js";
import ai, { AI_MODEL } from "../config/ai.js";

export const generateFeedback = async (req, res) => {
  const { batchId, studentId } = req.params;

  try {
    const { code } = req.body;
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

    // 3. Build prompts
    const systemPrompt = `You are an experienced and supportive coding teacher. Your role is to review and grade a student's code submission in a way that feels human, empathetic, and constructive.`;

    const userPrompt = `
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
6. If the code is too long or too complex, try to skip minor errors and just say it like revise back, but for major errors explain them. In case of too many major errors, say that the student does not meet criteria and summarize the errors without explaining each.
   Suggested Score: [number between 0 and ${batch.total_points}]
`.trim();

    // 4. Call DeepSeek via DeepInfra (OpenAI-compatible API)
    const completion = await ai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.4,
    });

    const aiFeedback = completion.choices?.[0]?.message?.content?.trim() || "";

    // 5. Save feedback to DB
    await db.execute("UPDATE students SET ai_feedback = ? WHERE id = ?", [
      aiFeedback,
      studentId,
    ]);

    res.json({ feedback: aiFeedback });
  } catch (err) {
    console.error("❌ AI generation failed:", err);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
};

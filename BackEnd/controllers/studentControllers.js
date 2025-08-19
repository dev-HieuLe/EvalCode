import db from "../config/db.js";

export const getStudents = async (req, res) => {
  const batchId = req.params.batchId;
  try {
    const [students] = await db.execute("SELECT * FROM Students WHERE batch_id = ?", [batchId]);
    res.json(students);
  } catch {
    res.status(500).json({ error: "Failed to get students" });
  }
};

export const addStudent = async (req, res) => {
  const batchId = req.params.batchId;
  const { name } = req.body;
  try {
    const [result] = await db.execute(
      `INSERT INTO Students (batch_id, name, status, grade, code, ai_feedback)
       VALUES (?, ?, 'Awaiting Grade', 'N/A', '', '')`,
      [batchId, name]
    );
    res.status(201).json({ id: result.insertId });
  } catch {
    res.status(500).json({ error: "Failed to add student" });
  }
};

export const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { status, grade, code, ai_feedback } = req.body;
  try {
    await db.execute(
      `UPDATE Students SET status=?, grade=?, code=?, ai_feedback=? WHERE id=?`,
      [status, grade, code, ai_feedback, studentId]
    );
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to update student" });
  }
};

export const deleteStudent = async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const [rows] = await db.execute(
      `SELECT Students.id FROM Students
       JOIN Batches ON Students.batch_id = Batches.id
       WHERE Students.id = ? AND Batches.user_id = ?`,
      [studentId, req.id]
    );
    if (rows.length === 0) return res.status(403).json({ error: "Student not found or unauthorized" });

    await db.execute("DELETE FROM Students WHERE id = ?", [studentId]);
    res.status(200).json({ status: "Student deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete student" });
  }
};

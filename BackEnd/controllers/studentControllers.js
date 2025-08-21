// controllers/studentControllers.js
import db from "../config/db.js";

export const getStudents = async (req, res) => {
  const batchId = req.params.batchId;
  try {
    // Check batch ownership
    const [batchRows] = await db.execute(
      "SELECT id FROM Batches WHERE id = ? AND user_id = ?",
      [batchId, req.id]
    );
    if (batchRows.length === 0) {
      return res.status(403).json({ error: "Batch not found or unauthorized" });
    }

    const [students] = await db.execute(
      "SELECT * FROM Students WHERE batch_id = ? ORDER BY id ASC",
      [batchId]
    );

    res.json(students);
  } catch (err) {
    console.error("getStudents error:", err);
    res.status(500).json({ error: "Failed to get students" });
  }
};


export const addStudent = async (req, res) => {
  const batchId = req.params.batchId;
  const { name } = req.body;

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    // verify batch ownership
    const [batchRows] = await db.execute(
      "SELECT id FROM Batches WHERE id = ? AND user_id = ?",
      [batchId, req.id]
    );
    if (batchRows.length === 0) {
      return res.status(403).json({ error: "Batch not found or unauthorized" });
    }

    const [result] = await db.execute(
      `INSERT INTO Students (batch_id, name, status, grade, code, ai_feedback)
       VALUES (?, ?, 'Awaiting Grade', '0', 'N/A', 'N/A')`,
      [batchId, name]
    );

    // Return the created student row
    const [rows] = await db.execute("SELECT * FROM Students WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("addStudent error:", err);
    res.status(500).json({ error: "Failed to add student" });
  }
};


export const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { status, grade, code, ai_feedback } = req.body;

  try {
    // Ensure student belongs to a batch owned by user
    const [rowsCheck] = await db.execute(
      `SELECT s.id FROM Students s
       JOIN Batches b ON s.batch_id = b.id
       WHERE s.id = ? AND b.user_id = ?`,
      [studentId, req.id]
    );

    if (rowsCheck.length === 0) {
      return res.status(403).json({ error: "Student not found or unauthorized" });
    }

    await db.execute(
      `UPDATE Students SET status = ?, grade = ?, code = ?, ai_feedback = ? WHERE id = ?`,
      [status, grade, code, ai_feedback, studentId]
    );

    // Return updated student row
    const [rows] = await db.execute("SELECT * FROM Students WHERE id = ?", [
      studentId,
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error("updateStudent error:", err);
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
  } catch (err) {
    console.error("deleteStudent error:", err);
    res.status(500).json({ error: "Failed to delete student" });
  }
};

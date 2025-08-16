// Backend (Node.js/Express) - server.js

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express();
const SALT_ROUNDS = 10;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ Status: "Error", Message: "No token" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ Error: "Token is expired!" });
    req.name = decoded.name;
    req.email = decoded.email;
    req.id = decoded.id;
    next();
  });
};

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "!mao1501",
  database: "evalyn",
  connectionLimit: 20,
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const sql =
      "INSERT INTO Users (name, email, password, credits) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(sql, [name, email, hash, 30]);
    const id = result.insertId;

    const accessToken = jwt.sign({ name, email, id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id, email },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const [newUser] = await db.execute(
      "SELECT credits FROM Users WHERE id = ?",
      [id]
    );
    const credits = newUser[0].credits;

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    return res.status(201).json({
      status: "Success",
      user: { name, email, id, credits },
    });
  } catch (err) {
    console.error("Duplicate error message:", err.message);
    if (err.message.includes("for key 'users.email'")) {
      return res.status(409).json({ error: "Email already registered!" });
    } else if (err.message.includes("for key 'users.name'")) {
      return res.status(409).json({ error: "Name already taken!" });
    } else {
      return res.status(409).json({ error: "Account already exist" });
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.execute("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    if (
      rows.length === 0 ||
      !(await bcrypt.compare(password, rows[0].password))
    ) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { id, name, credits } = rows[0];
    const refreshToken = jwt.sign(
      { id, email },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const accessToken = jwt.sign({ name, email, id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    return res.status(200).json({
      status: "Success",
      user: { name, email, id, credits },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/user", verifyUser, async (req, res) => {
  const [rows] = await db.execute("SELECT credits FROM Users WHERE id = ?", [
    req.id,
  ]);
  const credits = rows[0].credits;
  return res.json({
    Status: "Success",
    name: req.name,
    email: req.email,
    id: req.id,
    credits,
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "Lax" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  return res.json({ Status: "Success" });
});

app.post("/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid refresh token" });
      const [rows] = await db.execute("SELECT name FROM Users WHERE id = ?", [
        user.id,
      ]);
      const name = rows[0].name;

      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email, name },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
      res.cookie("token", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
      return res.json({ status: "Success" });
    }
  );
});









// ---------------Grading API--------------------------------


// Get all batches for a user
app.get("/batches", verifyUser, async (req, res) => {
  try {
    const [batches] = await db.execute(
      "SELECT * FROM batches WHERE user_id = ?",
      [req.id]
    );
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: "Failed to get batches" });
  }
});

// Create new batch
app.post("/batches", verifyUser, async (req, res) => {
  const {
    title,
    instructions,
    grading_criteria,
    language,
    feedback_tone,
    total_points,
  } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO batches (user_id, title, instructions, grading_criteria, language, feedback_tone, total_points)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.id, title, instructions, grading_criteria, language, feedback_tone, total_points]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create batch" });
  }
});
// Update batch
app.put("/api/batches/:batchId", verifyUser, async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const {
      title,
      instructions,
      grading_criteria,
      language,
      feedback_tone,
      total_points,
    } = req.body;

    const [rows] = await db.execute(
      "SELECT * FROM Batches WHERE id = ? AND user_id = ?",
      [batchId, req.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Batch not found or unauthorized" });
    }

    await db.execute(
      `UPDATE Batches SET title = ?, instructions = ?, grading_criteria = ?, language = ?, feedback_tone = ?, total_points = ? WHERE id = ?`,
      [
        title,
        instructions,
        grading_criteria,
        language,
        feedback_tone,
        total_points,
        batchId,
      ]
    );

    res.status(200).json({ status: "Batch updated" });
  } catch (err) {
    console.error("Error updating batch:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Delete batch
app.delete("/api/batches/:batchId", verifyUser, async (req, res) => {
  try {
    const batchId = req.params.batchId;

    // Ensure this batch belongs to the logged-in user
    const [batch] = await db.execute(
      "SELECT * FROM Batches WHERE id = ? AND user_id = ?",
      [batchId, req.id]
    );

    if (batch.length === 0) {
      return res.status(404).json({ error: "Batch not found or unauthorized" });
    }

    // Delete the batch (students will be deleted automatically via ON DELETE CASCADE)
    await db.execute("DELETE FROM Batches WHERE id = ?", [batchId]);

    res.status(200).json({ status: "Batch deleted" });
  } catch (err) {
    console.error("Error deleting batch:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get students by batch
app.get("/batches/:batchId/students", verifyUser, async (req, res) => {
  const batchId = req.params.batchId;
  try {
    const [students] = await db.execute(
      "SELECT * FROM students WHERE batch_id = ?",
      [batchId]
    );
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to get students" });
  }
});

// Add a student to a batch
app.post("/batches/:batchId/students", verifyUser, async (req, res) => {
  const batchId = req.params.batchId;
  const { name } = req.body;
  try {
    const [result] = await db.execute(
      `INSERT INTO students (batch_id, name, status, grade, code, ai_feedback)
       VALUES (?, ?, 'Awaiting Grade', 'N/A', '', '')`,
      [batchId, name]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

//Update student in batch
app.put("/students/:id", verifyUser, async (req, res) => {
  const studentId = req.params.id;
  const { status, grade, code, ai_feedback } = req.body;

  try {
    await db.execute(
      `UPDATE students SET status = ?, grade = ?, code = ?, ai_feedback = ?
       WHERE id = ?`,
      [status, grade, code, ai_feedback, studentId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

//Delete student in batch
app.delete("/api/students/:studentId", verifyUser, async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Ensure the student belongs to one of the user's batches
    const [rows] = await db.execute(
      `SELECT Students.id FROM Students
       JOIN Batches ON Students.batch_id = Batches.id
       WHERE Students.id = ? AND Batches.user_id = ?`,
      [studentId, req.id]
    );

    if (rows.length === 0) {
      return res.status(403).json({ error: "Student not found or unauthorized" });
    }

    await db.execute("DELETE FROM Students WHERE id = ?", [studentId]);

    res.status(200).json({ status: "Student deleted" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});





app.get("/server", (req, res) => {
  res.send("Server is running and connected to the database!");
});

app.listen(8081, () => {
  console.log("Database Is Running!!");
});

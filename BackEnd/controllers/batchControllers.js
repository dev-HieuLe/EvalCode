import db from "../config/db.js";

export const getBatches = async (req, res) => {
  try {
    const [batches] = await db.execute(
      "SELECT * FROM batches WHERE user_id = ?",
      [req.id]
    );
    res.json(batches);
  } catch {
    res.status(500).json({ error: "Failed to get batches" });
  }
};

//Including Batch ID, to edit that batch
export const getBatchById = async (req, res) => {
  const batchId = req.params.batchId;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM batches WHERE id = ? AND user_id = ?",
      [batchId, req.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Batch not found or unauthorized" });

    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to get batch" });
  }
};

export const createBatch = async (req, res) => {
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
      [
        req.id,
        title,
        instructions,
        grading_criteria,
        language,
        feedback_tone,
        total_points,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      instructions,
      grading_criteria,
      language,
      feedback_tone,
      total_points,
    });
  } catch (err) {
    console.error("❌ Failed to create batch:", err);
    res.status(500).json({ error: "Failed to create batch" });
  }
};

export const updateBatch = async (req, res) => {
  const batchId = req.params.batchId;
  const {
    title,
    instructions,
    grading_criteria,
    language,
    feedback_tone,
    total_points,
  } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM batches WHERE id = ? AND user_id = ?",
      [batchId, req.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Batch not found or unauthorized" });

    await db.execute(
      `UPDATE batches SET title=?, instructions=?, grading_criteria=?, language=?, feedback_tone=?, total_points=? WHERE id=?`,
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
  } catch {
    res.status(500).json({ error: "Failed to update batch" });
  }
};

export const deleteBatch = async (req, res) => {
  const batchId = req.params.batchId;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM batches WHERE id = ? AND user_id = ?",
      [batchId, req.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Batch not found or unauthorized" });

    await db.execute("DELETE FROM batches WHERE id = ?", [batchId]);
    res.status(200).json({ status: "Batch deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete batch" });
  }
};

// controllers/exportController.js
import PDFDocument from "pdfkit";
import db from "../config/db.js";

export const exportBatchReport = async (req, res) => {
  const { batchId } = req.params;

  try {
    // Verify batch belongs to user
    const [batchRows] = await db.execute(
      "SELECT * FROM Batches WHERE id = ? AND user_id = ?",
      [batchId, req.id]
    );

    if (batchRows.length === 0) {
      return res.status(404).json({ error: "Batch not found or unauthorized" });
    }
    const batch = batchRows[0];

    // Get students from batch
    const [students] = await db.execute(
      "SELECT id, name, grade, ai_feedback FROM Students WHERE batch_id = ? ORDER BY id ASC",
      [batchId]
    );

    // Create PDF
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=batch_${batchId}_report.pdf`
    );
    doc.pipe(res);

    // ===== Header Info =====
    doc.fontSize(20).text(`Batch Report: ${batch.title}`, { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Instructions: ${batch.instructions || "N/A"}`);
    doc.moveDown(0.3);
    doc.fontSize(12).text(`Criteria: ${batch.criteria || "N/A"}`);
    doc.moveDown(1);

    // ===== Table Setup =====
    const tableTop = doc.y;

    const colWidths = {
      id: 50,
      name: 150,
      feedback: 280, // make this the largest
      grade: 60,
    };

    const startX = 50; // left margin
    const colX = {
      id: startX,
      name: startX + colWidths.id,
      feedback: startX + colWidths.id + colWidths.name,
      grade: startX + colWidths.id + colWidths.name + colWidths.feedback,
    };

    // Helper to draw a table row with dynamic height
    const drawRow = (y, row, isHeader = false) => {
      doc.fontSize(10).font(isHeader ? "Helvetica-Bold" : "Helvetica");

      const feedbackText = row.ai_feedback || "No feedback";
      const feedbackHeight = doc.heightOfString(feedbackText, {
        width: colWidths.feedback - 8, // padding
      });

      const rowHeight = Math.max(25, feedbackHeight + 10);

      // Borders
      doc.rect(startX, y, colWidths.id, rowHeight).stroke();
      doc.rect(colX.name, y, colWidths.name, rowHeight).stroke();
      doc.rect(colX.feedback, y, colWidths.feedback, rowHeight).stroke();
      doc.rect(colX.grade, y, colWidths.grade, rowHeight).stroke();

      // Text inside cells
      if (isHeader) {
        doc.text(row.id, colX.id + 5, y + 8, { width: colWidths.id - 10, align: "center" });
        doc.text(row.name, colX.name + 5, y + 8, { width: colWidths.name - 10 });
        doc.text(row.feedback, colX.feedback + 5, y + 8, { width: colWidths.feedback - 10 });
        doc.text(row.grade, colX.grade + 5, y + 8, { width: colWidths.grade - 10, align: "center" });
      } else {
        doc.text(row.id, colX.id + 5, y + 8, { width: colWidths.id - 10, align: "center" });
        doc.text(row.name, colX.name + 5, y + 8, { width: colWidths.name - 10 });
        doc.text(feedbackText, colX.feedback + 5, y + 8, { width: colWidths.feedback - 10 });
        doc.text(
          row.grade != null ? `${row.grade}/${batch.total_points}` : "Not graded",
          colX.grade + 5,
          y + 8,
          { width: colWidths.grade - 10, align: "center" }
        );
      }

      return rowHeight;
    };

    // ===== Draw header row =====
    let y = tableTop;
    drawRow(y, { id: "ID", name: "Student Name", feedback: "Feedback", grade: "Grade" }, true);
    y += 25;

    // ===== Draw students =====
    students.forEach((s) => {
      const rowHeight = drawRow(y, s);
      y += rowHeight;

      // Pagination
      if (y > 750) {
        doc.addPage();
        y = 50;
      }
    });

    doc.end();
  } catch (err) {
    console.error("❌ PDF export error:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};

import React, { useState, useEffect } from "react";
import { ArrowLeft, BrainCircuit, Save } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;
const MONO_FONT = `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

const GradingPage = ({ student, onBack, onUpdate }) => {
  const { batchId } = useParams();

  const [code, setCode] = useState(student.code || "");
  const [aiFeedback, setAiFeedback] = useState(student.ai_feedback || "");
  const [grade, setGrade] = useState(student.grade || "");
  const [maxGrade, setMaxGrade] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/batches/${batchId}`,
          { withCredentials: true }
        );
        setMaxGrade(res.data.total_points || null);
      } catch (err) {
        console.error("Failed to load config:", err);
        setError("Could not load batch configuration.");
      }
    };
    fetchConfig();
  }, [batchId]);

  const handleSave = async () => {
    setError(null);

    if (!grade || isNaN(grade)) {
      setError("Grade must be a number.");
      return;
    }
    const numericGrade = parseInt(grade, 10);
    if (numericGrade < 0 || numericGrade > maxGrade) {
      setError(`Grade must be between 0 and ${maxGrade}.`);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/batches/${batchId}/students/${student.id}`,
        {
          status: "Graded",
          grade: numericGrade,
          code,
          ai_feedback: aiFeedback,
        },
        { withCredentials: true }
      );

      onUpdate(res.data);
      onBack();
    } catch (err) {
      console.error("Failed to save grade:", err);
      setError("Failed to save grade");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ai/batches/${batchId}/students/${student.id}/feedback`,
        { code },
        { withCredentials: true }
      );
      setAiFeedback(res.data.feedback);
    } catch (err) {
      console.error("Failed to generate AI feedback:", err);
      setError("Could not generate AI feedback.");
    } finally {
      setLoading(false);
    }
  };

  const surfaceStyle = {
    background: "#ffffff",
    color: "#000000",
    border: "1px solid #e4e4e7",
    borderRadius: 12,
    padding: 24,
  };

  const inputBoxStyle = {
    width: "100%",
    background: "#fbfbf5",
    color: "#000000",
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    padding: 12,
    fontFamily: MONO_FONT,
    fontSize: 14,
    outline: "none",
  };

  return (
    <div style={{ color: "#000000" }}>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-6"
        style={{
          color: "#52525b",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.28px",
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to submissions
      </button>

      <h2
        style={{
          fontFamily: DISPLAY_FONT,
          fontSize: 48,
          fontWeight: 330,
          lineHeight: 1.14,
        }}
      >
        Grading: {student.name}
      </h2>
      <p
        className="mt-2 mb-8"
        style={{
          color: "#52525b",
          fontSize: 16,
          fontWeight: 420,
          lineHeight: 1.5,
        }}
      >
        CS101: Python Basics
      </p>

      {error && (
        <div
          className="mb-3"
          style={{
            color: "#dc2626",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.28px",
          }}
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Code */}
        <div style={surfaceStyle}>
          <h3
            className="mb-3"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "0.72px",
              lineHeight: 1.25,
            }}
          >
            Student code
          </h3>
          <textarea
            placeholder="Paste student code here..."
            className="h-[400px]"
            style={inputBoxStyle}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        {/* Feedback + Grading */}
        <div style={surfaceStyle}>
          <h3
            className="mb-3"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "0.72px",
              lineHeight: 1.25,
            }}
          >
            AI feedback
          </h3>
          <textarea
            rows={10}
            placeholder="Click 'Generate AI feedback' to populate this area."
            className="h-[250px]"
            style={inputBoxStyle}
            value={aiFeedback}
            readOnly
          />

          <button
            onClick={handleGenerateAI}
            className="mt-4 w-full inline-flex items-center justify-center gap-2"
            style={{
              background: "#000000",
              color: "#ffffff",
              borderRadius: 9999,
              padding: "12px 24px",
              fontSize: 16,
              fontWeight: 550,
              border: "none",
            }}
          >
            <BrainCircuit className="w-4 h-4" />
            Generate AI feedback
          </button>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                style={{
                  background: "#ffffff",
                  color: "#000000",
                  border: "1px solid #e4e4e7",
                  borderRadius: 8,
                  padding: "10px 12px",
                  fontSize: 16,
                  width: 100,
                  outline: "none",
                }}
              />
              <span
                className="whitespace-nowrap"
                style={{
                  color: "#52525b",
                  fontSize: 16,
                  fontWeight: 420,
                }}
              >
                / {maxGrade !== null ? maxGrade : "..."}
              </span>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2"
              style={{
                background: "#c1fbd4",
                color: "#000000",
                borderRadius: 9999,
                padding: "12px 24px",
                fontSize: 16,
                fontWeight: 550,
                border: "none",
                opacity: loading ? 0.5 : 1,
              }}
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Finalize and save grade"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingPage;

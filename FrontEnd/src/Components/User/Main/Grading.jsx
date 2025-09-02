// GradingPage.jsx
import React, { useState, useEffect } from "react";
import { ArrowLeft, BrainCircuit, Save } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GradingPage = ({ student, onBack, onUpdate }) => {
  const { batchId } = useParams();

  const [code, setCode] = useState(student.code || "");
  const [aiFeedback, setAiFeedback] = useState(student.ai_feedback || "");
  const [grade, setGrade] = useState(student.grade || "");
  const [maxGrade, setMaxGrade] = useState(null); // from config
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch batch config (to get maxGrade)
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`/api/batches/${batchId}`, {
          withCredentials: true,
        });
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

    // Validation: check grade
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
        `/api/batches/${batchId}/students/${student.id}`,
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
      `/api/ai/batches/${batchId}/students/${student.id}/feedback`,
      {code},
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


  return (
    <div className="text-gray-900">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-md mb-6 text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Submissions
      </button>

      <h2 className="text-2xl font-bold mb-1">Grading: {student.name}</h2>
      <p className="text-gray-500 mb-6">CS101: Python Basics</p>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Code */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200 shadow-md p-4 flex flex-col">
          <textarea
            placeholder="Put your student's code here..."
            className="w-full h-[400px] overflow-y-auto bg-white/40 p-3 rounded-xl border border-gray-300 text-sm font-mono focus:outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        {/* Feedback + Grading */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200 shadow-md p-4 flex flex-col">
          <textarea
            rows={10}
            placeholder="Click 'Generate AI Feedback' to populate this area."
            className="w-full h-[250px] overflow-y-auto bg-white/40 p-3 rounded-xl border border-gray-300 text-sm font-mono focus:outline-none"
            value={aiFeedback}
            readOnly
          />

          <button
            onClick={handleGenerateAI}
            className="mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow"
          >
            <BrainCircuit className="w-4 h-4" />
            Generate AI Feedback
          </button>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className=" px-4 py-2 bg-white/40 border border-gray-300 rounded-xl focus:outline-none"
              />
              <span className="whitespace-nowrap">/ {maxGrade !== null ? maxGrade : "..."}</span>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Finalize and Save Grade"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingPage;

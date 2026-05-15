import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const inputStyle = {
  width: "100%",
  background: "#ffffff",
  color: "#000000",
  border: "1px solid #e4e4e7",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 16,
  fontWeight: 420,
  outline: "none",
};

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: "0.28px",
  color: "#000000",
};

const Configuration = () => {
  const { batchId } = useParams();

  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    title: "",
    instructions: "",
    grading_criteria: "",
    language: "",
    feedback_tone: "",
    total_points: "",
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/batches/${batchId}`,
          { withCredentials: true }
        );
        if (res.data) {
          setConfig({
            title: res.data.title || "",
            instructions: res.data.instructions || "",
            grading_criteria: res.data.grading_criteria || "",
            language: res.data.language || "",
            feedback_tone: res.data.feedback_tone || "",
            total_points: res.data.total_points || "",
          });
        }
      } catch (err) {
        console.error("Error fetching config:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [batchId]);

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/batches/${batchId}`,
        config,
        { withCredentials: true }
      );
      alert("Configuration saved successfully.");
    } catch (err) {
      console.error("Error saving config:", err);
      alert("Failed to save configuration");
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-[300px] flex items-center justify-center"
        style={{ color: "#71717a", fontSize: 14 }}
      >
        <div
          className="w-8 h-8 rounded-full animate-spin"
          style={{
            border: "2px solid #e4e4e7",
            borderTopColor: "#000000",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ color: "#000000" }}>
      <h2
        style={{
          fontFamily: DISPLAY_FONT,
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: "0.36px",
          lineHeight: 1.14,
        }}
      >
        Assignment configuration
      </h2>
      <p
        className="mt-2 mb-8"
        style={{
          color: "#52525b",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.28px",
        }}
      >
        Customize how AI grades and gives feedback for this batch.
      </p>

      <div className="space-y-6">
        <div>
          <label style={labelStyle}>Assignment title</label>
          <input
            type="text"
            name="title"
            value={config.title}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter assignment title"
          />
        </div>

        <div>
          <label style={labelStyle}>Assignment instructions</label>
          <textarea
            rows={4}
            name="instructions"
            value={config.instructions}
            onChange={handleChange}
            style={{ ...inputStyle, resize: "none" }}
            placeholder="Enter instructions for the assignment"
          />
        </div>

        <div>
          <label style={labelStyle}>Grading criteria</label>
          <textarea
            rows={3}
            name="grading_criteria"
            value={config.grading_criteria}
            onChange={handleChange}
            style={{ ...inputStyle, resize: "none" }}
            placeholder="e.g., Code correctness, readability, and efficiency"
          />
        </div>

        <div>
          <label style={labelStyle}>Language</label>
          <select
            name="language"
            value={config.language}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select a language</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="c">C</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Feedback tone</label>
          <select
            name="feedback_tone"
            value={config.feedback_tone}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select feedback tone</option>
            <option value="friendly">Friendly</option>
            <option value="formal">Formal</option>
            <option value="constructive">Constructive</option>
            <option value="encouraging">Encouraging</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Total points</label>
          <input
            type="number"
            name="total_points"
            value={config.total_points}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g., 100"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
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
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configuration;

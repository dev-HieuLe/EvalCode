import React, { useState } from "react";
import { FileText, Settings } from "lucide-react";
import Submissions from "./Main/Submission";
import Configuration from "./Main/Configuration";
import axios from "axios";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const GradingDashboard = ({ batchId }) => {
  const [activeTab, setActiveTab] = useState("submissions");
  if (!batchId) {
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ color: "#71717a", fontSize: 16 }}
      >
        Please create or select a batch to start grading.
      </div>
    );
  }
  const handleExport = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/export/${batchId}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `batch_${batchId}_report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export PDF");
    }
  };
  return (
    <div
      style={{
        background: "#fbfbf5",
        color: "#000000",
        minHeight: "100vh",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <span
          className="inline-block uppercase mb-4"
          style={{
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: "0.72px",
            color: "#52525b",
          }}
        >
          AI Grading
        </span>
        <h1
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: 48,
            fontWeight: 330,
            lineHeight: 1.14,
          }}
        >
          Grade smarter.
        </h1>
        <p
          className="mt-3 max-w-2xl"
          style={{
            color: "#52525b",
            fontSize: 16,
            fontWeight: 420,
            lineHeight: 1.5,
          }}
        >
          Upload or enter students' work, configure grading, and get
          AI-powered feedback.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mt-8">
          <button
            onClick={() => setActiveTab("submissions")}
            className="inline-flex items-center gap-2"
            style={{
              background: activeTab === "submissions" ? "#000000" : "#ffffff",
              color: activeTab === "submissions" ? "#ffffff" : "#000000",
              border: "1px solid #000000",
              borderRadius: 9999,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 550,
              letterSpacing: "0.28px",
            }}
          >
            <FileText className="w-4 h-4" />
            Submissions
          </button>

          <button
            onClick={() => setActiveTab("configuration")}
            className="inline-flex items-center gap-2"
            style={{
              background: activeTab === "configuration" ? "#000000" : "#ffffff",
              color: activeTab === "configuration" ? "#ffffff" : "#000000",
              border: "1px solid #000000",
              borderRadius: 9999,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 550,
              letterSpacing: "0.28px",
            }}
          >
            <Settings className="w-4 h-4" />
            Configuration
          </button>
        </div>

        <div
          className="mt-6"
          style={{
            background: "#ffffff",
            border: "1px solid #e4e4e7",
            borderRadius: 12,
            padding: 32,
            boxShadow:
              "0 8px 8px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.06), 0 2px 2px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)",
          }}
        >
          {activeTab === "submissions" ? <Submissions /> : <Configuration />}
        </div>

        <button
          onClick={handleExport}
          className="mt-10"
          style={{
            background: "#c1fbd4",
            color: "#000000",
            borderRadius: 9999,
            padding: "12px 24px",
            fontSize: 16,
            fontWeight: 550,
            border: "none",
          }}
        >
          Export PDF report
        </button>
      </div>
    </div>
  );
};

export default GradingDashboard;

import React, { useState, useContext } from "react";
import { FileText, Settings } from "lucide-react";
import Submissions from "./Main/Submission";
import Configuration from "./Main/Configuration";
import { useParams } from "react-router-dom";
import axios from "axios";

const GradingDashboard = ({ batchId }) => {
  const [activeTab, setActiveTab] = useState("submissions");
  if (!batchId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Please create or select a batch to start grading.
      </div>
    );
  }
  const handleExport = async () => {
    try {
      const res = await axios.get(`/api/export/${batchId}`, {
        responseType: "blob",
        withCredentials: true,
      });

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
    <div className="min-h-screen bg-white text-gray-900 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600 text-transparent bg-clip-text bg-[length:200%] animate-gradient">
          AI Code Grading Assistant
        </h1>
        <p className="text-gray-600 max-w-2xl mb-4">
          Upload or enter students' work, configure grading, and get AI-powered
          feedback.
        </p>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              activeTab === "submissions"
                ? "bg-white/40 border border-gray-300 text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-800 border border-transparent"
            } backdrop-blur-md transition`}
          >
            <FileText className="w-4 h-4" />
            Submissions
          </button>

          <button
            onClick={() => setActiveTab("configuration")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              activeTab === "configuration"
                ? "bg-white/40 border border-gray-300 text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-800 border border-transparent"
            } backdrop-blur-md transition`}
          >
            <Settings className="w-4 h-4" />
            Configuration
          </button>
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6">
          {activeTab === "submissions" ? <Submissions /> : <Configuration />}
        </div>
        {/* Export button */}
        <button
          onClick={handleExport}
          className="mt-10 px-5 py-2.5 rounded-xl bg-gradient-to-r border border-gray-200 from-green-400 to-emerald-400 text-white font-semibold hover:from-green-600 hover:to-emerald-500 hover:shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
        >
          Export PDF Report
        </button>
      </div>
    </div>
  );
};

export default GradingDashboard;

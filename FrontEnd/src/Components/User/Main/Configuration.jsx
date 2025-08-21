import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  // Fetch existing config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`/api/batches/${batchId}`);
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
        setLoading(false); // ✅ done fetching
      }
    };
    fetchConfig();
  }, [batchId]);

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/batches/${batchId}`, config);
      alert("Configuration saved successfully!");
    } catch (err) {
      console.error("Error saving config:", err);
      alert("Failed to save configuration");
    }
  };

  // ⏳ Show spinner while loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600 text-transparent bg-clip-text bg-[length:200%] animate-gradient">
          Assignment Configuration
        </h1>

        <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 space-y-6">
          {/* Assignment Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              name="title"
              value={config.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter assignment title"
            />
          </div>

          {/* Assignment Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignment Instructions
            </label>
            <textarea
              rows={4}
              name="instructions"
              value={config.instructions}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter instructions for the assignment"
            />
          </div>

          {/* Grading Criteria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grading Criteria
            </label>
            <textarea
              rows={3}
              name="grading_criteria"
              value={config.grading_criteria}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Code correctness, readability, and efficiency"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              name="language"
              value={config.language}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a language</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="c++">C++</option>
              <option value="c">C</option>
            </select>
          </div>

          {/* Feedback Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback Tone
            </label>
            <select
              name="feedback_tone"
              value={config.feedback_tone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select feedback tone</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="constructive">Constructive</option>
              <option value="encouraging">Encouraging</option>
            </select>
          </div>

          {/* Total Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Points
            </label>
            <input
              type="number"
              name="total_points"
              value={config.total_points}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 100"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;

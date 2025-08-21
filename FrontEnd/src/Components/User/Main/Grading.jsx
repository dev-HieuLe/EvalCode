import React from "react";
import { ArrowLeft, Upload, BrainCircuit, Save } from "lucide-react";

const GradingPage = ({ student, onBack }) => {
  return (
    <div className="text-gray-900">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm mb-6 text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Submissions
      </button>

      <h2 className="text-2xl font-bold mb-1">Grading: {student.name}</h2>
      <p className="text-gray-500 mb-6">CS101: Python Basics</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Code */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200 shadow-md p-4 flex flex-col">
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-500">
              Language:{" "}
              <span className="text-blue-600 font-medium">Python</span>
            </p>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
              <Upload className="w-4 h-4" />
              Upload File
            </button>
          </div>
          <textarea
            rows={15}
            className="w-full h-full bg-white/40 p-3 rounded-xl border border-gray-300 text-sm font-mono focus:outline-none"
            defaultValue={`name = input("Enter your name: ")
if name:
    print(f"Hello, {name}!")
else:
    print("Hello, world!")`}
          />
        </div>

        {/* Feedback + Grading */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200 shadow-md p-4 flex flex-col">
          <p className="text-sm text-gray-600 mb-2">
            Generate AI feedback and assign a final grade.
          </p>
          <textarea
            rows={10}
            placeholder="Click 'Generate AI Feedback' to populate this area."
            className="w-full h-full bg-white/40 p-3 rounded-xl border border-gray-300 text-sm font-mono focus:outline-none"
          />

          <div className="mt-4 flex flex-col gap-2">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
              <BrainCircuit className="w-4 h-4" />
              Generate AI Feedback
            </button>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Grade"
                className="w-full px-4 py-2 bg-white/40 border border-gray-300 rounded-xl focus:outline-none"
              />
              <span>/ 10</span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Save className="w-4 h-4" />
              Finalize and Save Grade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingPage;

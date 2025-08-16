import React from 'react';

const Configuration = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600 text-transparent bg-clip-text bg-[length:200%] animate-gradient">
          Assignment Configuration
        </h1>

        <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 space-y-6">
          {/* Assignment Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter assignment title"
            />
          </div>

          {/* Assignment Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Instructions</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter instructions for the assignment"
            />
          </div>

          {/* Grading Criteria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grading Criteria</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Code correctness, readability, and efficiency"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Tone</label>
            <select className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select feedback tone</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="constructive">Constructive</option>
              <option value="encouraging">Encouraging</option>
            </select>
          </div>

          {/* Total Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Points</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;

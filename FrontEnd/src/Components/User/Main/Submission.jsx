import React, { useState } from "react";
import {
  FileText,
  Plus,
  UserRoundSearch,
  X,
  Check,
  Trash2,
} from "lucide-react";
import GradingPage from "./Grading"; // your grading page component

const Submissions = () => {
  const [students, setStudents] = useState([
    { name: "Alice Johnson", grade: "N/A" },
    { name: "Bob Williams", grade: "N/A" },
  ]);
  const [gradingStudent, setGradingStudent] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");

  const handleAddStudent = () => {
    if (newStudentName.trim() !== "") {
      setStudents([...students, { name: newStudentName, grade: "N/A" }]);
      setNewStudentName("");
      setShowModal(false);
    }
  };

  const handleDeleteStudent = (indexToRemove) => {
    setStudents((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  if (gradingStudent) {
    return (
      <GradingPage
        student={gradingStudent}
        onBack={() => setGradingStudent(null)}
      />
    );
  }

  return (
    <div className="relative">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Student Submissions</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md border border-gray-300 text-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-6">
        Select a student to view their submission and provide feedback.
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-gray-500 text-sm border-b border-gray-300">
            <tr>
              <th className="py-3">Student</th>
              <th>Status</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-100/40 transition"
              >
                <td className="py-3 font-medium">{student.name}</td>
                <td>
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    <UserRoundSearch className="w-3.5 h-3.5" />
                    Awaiting Grade
                  </span>
                </td>
                <td>{student.grade}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGradingStudent(student)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/40 border border-gray-300 text-gray-700 rounded-lg backdrop-blur-md shadow-sm hover:shadow-md transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      Grade
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(index)}
                      className="flex  items-center gap-2 px-3 py-1.5 text-black rounded-lg hover:text-red-300  transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center rounded-xl">
          <div className="bg-white/70 backdrop-blur-md border border-gray-300 rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Add New Student</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="Enter student name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddStudent}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              <Check className="w-4 h-4" />
              Add Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;

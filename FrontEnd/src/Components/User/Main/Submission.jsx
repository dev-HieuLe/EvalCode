import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FileText,
  Plus,
  UserRoundSearch,
  X,
  Check,
  Trash2,
} from "lucide-react";
import axios from "axios";
import GradingPage from "./Grading";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const Submissions = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [gradingStudent, setGradingStudent] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");

  const { batchId } = useParams();

  useEffect(() => {
    if (!batchId) return;
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/batches/${batchId}/students`,
          { withCredentials: true }
        );
        setStudents(res.data || []);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [batchId]);

  const handleAddStudent = async () => {
    if (!newStudentName.trim()) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/batches/${batchId}/students`,
        { name: newStudentName },
        { withCredentials: true }
      );
      setStudents((prev) => [...prev, res.data]);
      setNewStudentName("");
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add student:", err);
      setError("Failed to add student");
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/batches/${batchId}/students/${studentId}`,
        { withCredentials: true }
      );
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
    } catch (err) {
      console.error("Failed to delete student:", err);
      setError("Failed to delete student");
    }
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  if (gradingStudent) {
    return (
      <GradingPage
        student={gradingStudent}
        onBack={() => setGradingStudent(null)}
        onUpdate={handleUpdateStudent}
      />
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: "0.36px",
            lineHeight: 1.14,
          }}
        >
          Students
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2"
          style={{
            background: "#000000",
            color: "#ffffff",
            borderRadius: 9999,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 550,
            border: "none",
            letterSpacing: "0.28px",
          }}
        >
          <Plus className="w-4 h-4" />
          Add student
        </button>
      </div>

      <p
        className="mb-6"
        style={{
          color: "#52525b",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.28px",
        }}
      >
        Select a student to view their submission and provide feedback.
      </p>

      {loading ? (
        <div style={{ color: "#71717a", fontSize: 14 }}>Loading students...</div>
      ) : error ? (
        <div style={{ color: "#dc2626", fontSize: 14 }}>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead
              style={{
                color: "#52525b",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-0.13px",
                borderBottom: "1px solid #e4e4e7",
              }}
            >
              <tr>
                <th className="py-3">Student</th>
                <th>Status</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  style={{
                    borderTop: "1px solid #e4e4e7",
                    fontSize: 16,
                    fontWeight: 420,
                  }}
                >
                  <td
                    className="py-3"
                    style={{ fontWeight: 550, color: "#000000" }}
                  >
                    {student.name}
                  </td>
                  <td>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{
                        background:
                          student.grade == null || student.grade === ""
                            ? "#d4d4d8"
                            : "#c1fbd4",
                        color: "#000000",
                        borderRadius: 9999,
                        padding: "4px 12px",
                        fontSize: 12,
                        fontWeight: 400,
                        letterSpacing: "0.72px",
                        textTransform: "uppercase",
                      }}
                    >
                      <UserRoundSearch className="w-3 h-3" />
                      {student.grade == null || student.grade === ""
                        ? "Awaiting"
                        : student.status}
                    </span>
                  </td>

                  <td style={{ color: "#000000" }}>{student.grade || "N/A"}</td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setGradingStudent(student)}
                        className="inline-flex items-center gap-2"
                        style={{
                          background: "#ffffff",
                          color: "#000000",
                          border: "1px solid #000000",
                          borderRadius: 9999,
                          padding: "6px 14px",
                          fontSize: 13,
                          fontWeight: 550,
                          letterSpacing: "-0.13px",
                        }}
                      >
                        <FileText className="w-3 h-3" />
                        Grade
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        style={{
                          color: "#71717a",
                          padding: "6px",
                          borderRadius: 9999,
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 text-center"
                    style={{ color: "#71717a", fontSize: 14 }}
                  >
                    No students yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="w-full max-w-sm space-y-4"
            style={{
              background: "#ffffff",
              color: "#000000",
              borderRadius: 20,
              padding: 32,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
          >
            <div className="flex justify-between items-center">
              <h3
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: 24,
                  fontWeight: 400,
                  letterSpacing: "0.36px",
                  lineHeight: 1.14,
                }}
              >
                Add new student
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ color: "#71717a" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="Enter student name"
              style={{
                width: "100%",
                background: "#ffffff",
                color: "#000000",
                border: "1px solid #e4e4e7",
                borderRadius: 8,
                padding: "10px 12px",
                fontSize: 16,
                outline: "none",
              }}
            />

            <button
              onClick={handleAddStudent}
              className="w-full inline-flex items-center justify-center gap-2"
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
              <Check className="w-4 h-4" />
              Add student
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;

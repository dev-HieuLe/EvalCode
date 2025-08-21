// src/Components/User/Sidebar.jsx
import React, { useContext, useState } from "react";
import {
  LogOut,
  UserCircle,
  HelpCircle,
  Plus,
  Zap,
  Settings,
  Clover,
  Home,
  Database,
  Trash2,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Sidebar = ({ batches = [], loadingBatches = false, onCreateBatch, onDeleteBatch }) => {
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { auth, user, setAuth, setUser, setWasLoggedInBefore, loading } =
    useContext(AuthContext);
  const { id, batchId } = useParams();

  const handleLogout = async () => {
    try {
      await fetch("/logout", { credentials: "include" }); // fallback
    } catch (e) {
      // ignore
    }
    // Clear local auth state
    setAuth(false);
    setUser({});
    setWasLoggedInBefore(false);
    navigate("/");
  };

  const handleDelete = (batchId) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      onDeleteBatch?.(batchId);
    }
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between px-4 py-6">
      <div>
        <Link to="/" className="flex items-center space-x-2 mb-4">
          <Clover className="text-green-600 w-8 h-8" />
          <span className="text-xl font-semibold text-black">EvalAI</span>
        </Link>

        <button
          onClick={onCreateBatch}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-black text-white rounded-lg mb-4 hover:bg-neutral-800 transition"
        >
          <Plus size={16} /> New Grading
        </button>

        <div className="space-y-1">
          {loadingBatches ? (
            <div className="text-gray-400 text-sm">Loading batches...</div>
          ) : batches.length > 0 ? (
            batches.map((batch) => {
              const isActive = String(batch.id) === String(batchId);
              return (
                <div
                  key={batch.id}
                  className={`flex items-center justify-between px-3 py-2 rounded text-sm transition ${
                    isActive
                      ? "bg-gray-100 text-black font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Link
                    to={`/users/dashboard/${id}/batch/${batch.id}`}
                    className="flex-1 truncate"
                  >
                    {batch.title || batch.name || `Batch ${batch.id}`}
                  </Link>

                  <button
                    onClick={() => handleDelete(batch.id)}
                    className="ml-2 text-gray-400 hover:text-red-600"
                    title="Delete batch"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 text-sm italic">
              No batches yet. Create one!
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 border-t pt-4 text-sm text-gray-600 relative">
        <Link to="/" className="flex items-center gap-2 hover:text-black">
          <Home size={16} /> Home
        </Link>

        <button className="flex items-center gap-2 hover:text-black">
          <Trash2 size={16} /> Clear conversations
        </button>

        <button className="flex items-center gap-2 hover:text-black">
          <HelpCircle size={16} /> Updates & FAQ
        </button>

        {loading || typeof user?.credits !== "number" ? (
          <button className="flex items-center gap-2 hover:text-black opacity-50">
            <Database size={16} /> Loading credits...
          </button>
        ) : (
          <button className="flex items-center gap-2 hover:text-black">
            <Database size={16} /> Credits: {user.credits}
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setShowAccountMenu((prev) => !prev)}
            className="flex items-center gap-2 px-8 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-neutral-800 to-black hover:opacity-90 transition shadow-sm w-full"
          >
            <UserCircle className="w-5 h-5 text-white" />
            {user.name}
          </button>

          {showAccountMenu && (
            <div className="absolute bottom-14 left-0 w-72 bg-white rounded-xl shadow-xl z-50 py-3 px-4 text-sm text-gray-800 border border-gray-300">
              <div className="px-2 py-1 text-gray-500 font-medium text-sm">
                {user.email}
              </div>

              <div className="mt-2 space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                  <Zap size={16} /> Upgrade Plan
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                  <Settings size={16} /> Settings
                </button>
              </div>

              <hr className="my-2" />

              <div className="space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                  <HelpCircle size={16} /> Help
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:text-red-600 hover:bg-red-50 rounded"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useContext, useState } from "react";
import {
  LogOut,
  UserCircle,
  HelpCircle,
  Plus,
  Zap,
  Settings,
  Home,
  Database,
  Trash2,
  Clover,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const Sidebar = ({
  batches = [],
  loadingBatches = false,
  onCreateBatch,
  onDeleteBatch,
}) => {
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { user, setAuth, setUser, setWasLoggedInBefore, loading } =
    useContext(AuthContext);
  const { id, batchId } = useParams();

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (e) {
      // ignore
    }
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
    <div
      className="w-64 h-screen flex flex-col justify-between px-4 py-6"
      style={{
        background: "#fbfbf5",
        color: "#000000",
        borderRight: "1px solid #e4e4e7",
      }}
    >
      <div>
        <Link
          to="/"
          className="flex items-center gap-2 mb-6"
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.3px",
            color: "#000000",
          }}
        >
          <Clover className="w-6 h-6" style={{ color: "#0a7a3d" }} />
          EvalCode
        </Link>

        <button
          onClick={onCreateBatch}
          className="w-full flex items-center justify-center gap-2 mb-6"
          style={{
            background: "#000000",
            color: "#ffffff",
            borderRadius: 9999,
            padding: "10px 16px",
            fontSize: 14,
            fontWeight: 550,
            border: "none",
            letterSpacing: "0.28px",
          }}
        >
          <Plus size={16} /> New grading
        </button>

        <div className="space-y-1">
          {loadingBatches ? (
            <div style={{ color: "#71717a", fontSize: 14, letterSpacing: "0.28px" }}>
              Loading batches...
            </div>
          ) : batches.length > 0 ? (
            batches.map((batch) => {
              const isActive = String(batch.id) === String(batchId);
              return (
                <div
                  key={batch.id}
                  className="flex items-center justify-between"
                  style={{
                    background: isActive ? "#ffffff" : "transparent",
                    color: "#000000",
                    borderRadius: 9999,
                    padding: "8px 12px",
                    fontSize: 14,
                    fontWeight: isActive ? 550 : 420,
                    border: isActive ? "1px solid #e4e4e7" : "1px solid transparent",
                  }}
                >
                  <Link
                    to={`/users/dashboard/${id}/batch/${batch.id}`}
                    className="flex-1 truncate"
                    style={{ color: "#000000" }}
                  >
                    {batch.title || batch.name || `Batch ${batch.id}`}
                  </Link>

                  <button
                    onClick={() => handleDelete(batch.id)}
                    className="ml-2"
                    style={{ color: "#71717a" }}
                    title="Delete batch"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })
          ) : (
            <div style={{ color: "#71717a", fontSize: 14, letterSpacing: "0.28px" }}>
              No batches yet. Create one.
            </div>
          )}
        </div>
      </div>

      <div
        className="space-y-3 pt-4 relative"
        style={{
          borderTop: "1px solid #e4e4e7",
          fontSize: 14,
          color: "#52525b",
          letterSpacing: "0.28px",
        }}
      >
        <Link to="/" className="flex items-center gap-2">
          <Home size={16} /> Home
        </Link>

        <button className="flex items-center gap-2">
          <Trash2 size={16} /> Clear conversations
        </button>

        <button className="flex items-center gap-2">
          <HelpCircle size={16} /> Updates & FAQ
        </button>

        {loading || typeof user?.credits !== "number" ? (
          <button className="flex items-center gap-2 opacity-50">
            <Database size={16} /> Loading credits...
          </button>
        ) : (
          <button className="flex items-center gap-2">
            <Database size={16} /> Credits: {user.credits}
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setShowAccountMenu((prev) => !prev)}
            className="w-full flex items-center gap-2 justify-center"
            style={{
              background: "#000000",
              color: "#ffffff",
              borderRadius: 9999,
              padding: "10px 16px",
              fontSize: 14,
              fontWeight: 550,
              border: "none",
              letterSpacing: "0.28px",
            }}
          >
            <UserCircle className="w-4 h-4" />
            {user.name}
          </button>

          {showAccountMenu && (
            <div
              className="absolute bottom-14 left-0 w-72 z-50"
              style={{
                background: "#ffffff",
                color: "#000000",
                borderRadius: 12,
                padding: 12,
                boxShadow:
                  "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  color: "#71717a",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "-0.13px",
                  padding: "4px 8px",
                }}
              >
                {user.email}
              </div>

              <div className="mt-2 space-y-1">
                <button
                  className="w-full flex items-center gap-2"
                  style={{ padding: "8px 12px", fontSize: 14, borderRadius: 8 }}
                >
                  <Zap size={16} /> Upgrade plan
                </button>
                <button
                  className="w-full flex items-center gap-2"
                  style={{ padding: "8px 12px", fontSize: 14, borderRadius: 8 }}
                >
                  <Settings size={16} /> Settings
                </button>
              </div>

              <hr className="my-2" style={{ borderColor: "#e4e4e7" }} />

              <div className="space-y-1">
                <button
                  className="w-full flex items-center gap-2"
                  style={{ padding: "8px 12px", fontSize: 14, borderRadius: 8 }}
                >
                  <HelpCircle size={16} /> Help
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2"
                  style={{
                    padding: "8px 12px",
                    fontSize: 14,
                    borderRadius: 8,
                    color: "#dc2626",
                  }}
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

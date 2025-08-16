import React, { useContext, useState } from "react";
import {
  LogOut,
  Sun,
  Trash2,
  UserCircle,
  HelpCircle,
  Plus,
  ChevronRight,
  ChevronLeft,
  Zap,
  Settings,
  Clover,
  Home,
  Database,
} from "lucide-react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { auth, user, setAuth, setUser, setWasLoggedInBefore, loading } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const batches = [
    { id: "grade-1", name: "Grade 1" },
    { id: "grade-2", name: "Grade 2" },
  ];
  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then(() => {
        setAuth(false);
        setUser({});
        setWasLoggedInBefore(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between px-4 py-6">
      <div>
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0 mb-4">
          <Clover className="text-green-600 w-8 h-8 md:w-9 md:h-9" />
          <span className="text-xl md:text-2xl font-semibold text-black">
            EvalAI
          </span>
        </Link>
        {/* New Grading */}
        <button className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-black text-white rounded-lg mb-4 hover:bg-neutral-800">
          <Plus size={16} /> New Grading
        </button>

        {/* Saved Conversations */}
        <div className="space-y-1">
          {batches.map((batch) => {
            const isActive = location.pathname.includes(`/batch/${batch.id}`);
            return (
              <Link
                key={batch.id}
                to={`/users/dashboard/${id}/batch/${batch.id}`}
                className={`block px-3 py-2 rounded text-sm ${
                  isActive
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {batch.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Account & Footer */}
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
        {/* wait until not loading and user is a number  */}
        {loading || typeof user?.credits !== "number" ? (
          <button className="flex items-center gap-2 hover:text-black opacity-50">
            <Database size={16} /> Loading credits...
          </button>
        ) : (
          <button className="flex items-center gap-2 hover:text-black">
            <Database size={16} /> Credits: {user.credits}
          </button>
        )}
        {/* User Dropdown Toggle */}
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
              {/* Email */}
              <div className="px-2 py-1 text-gray-500 font-medium text-sm">
                {user.email}
              </div>

              {/* Upgrade & Settings */}
              <div className="mt-2 space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                  <Zap size={16} /> Nâng cấp gói
                </button>

                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                  <Settings size={16} /> Cài đặt
                </button>
              </div>

              {/* The gray line */}
              <hr className="my-2" />

              {/* Help & Logout */}
              <div className="space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
                  <HelpCircle size={16} /> Trợ giúp
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:text-red-600 hover:bg-red-50 rounded"
                >
                  <LogOut size={16} /> Đăng xuất
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

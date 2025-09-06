import React, { useState, useContext, useEffect } from "react";
import { Clover, ArrowUpRight, Menu, X, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    auth,
    user,
    setAuth,
    setUser,
    loading,
    authCheckedOnce,
    wasLoggedInBefore,
    setWasLoggedInBefore,
  } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/logout`)
      .then((res) => {
        setAuth(false);
        setUser({});
        setWasLoggedInBefore(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();
  const handleDirect = async () => {
    try {
      // First try to get the user
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, { withCredentials: true });

      if (res.data?.id) {
        navigate(`/users/dashboard/${res.data.id}`);
      } else {
        throw new Error("Invalid user data");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          // Try to refresh the token if not checkAuth()
          const refresh = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/refresh-token`,
            {},
            { withCredentials: true }
          );
          if (refresh.data.status === "Success") {
            //retry
            const retryRes = await axios.get("/user", {
              withCredentials: true,
            });
            if (retryRes.data?.id) {
              navigate(`/users/dashboard/${retryRes.data.id}`);
              return;
            }
          }
        } catch (refreshErr) {
          console.error("❌ Refresh token failed:", refreshErr);
        }
      }
      alert("Session expired. Please log in again.");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!loading && !auth && authCheckedOnce && wasLoggedInBefore) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    }
  }, [auth, loading, authCheckedOnce, wasLoggedInBefore]);

  if (loading) return null;
  return (
    <nav className="bg-white rounded-2xl md:rounded-full shadow-sm px-3 md:px-6 py-4 md:py-6 max-w-7xl mx-2 md:mx-auto mt-3 md:mt-4 border border-gray-200">
      <div className="flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center min-w-0">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Clover className="text-green-600 w-8 h-8 md:w-9 md:h-9" />
            <span className="text-xl md:text-2xl font-semibold text-black">
              EvalCode
            </span>
          </Link>
        </div>

        {/* Center: Links */}
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-800">
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="nav-link">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/faq" className="nav-link">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Buttons (hidden on mobile) */}
        {!auth ? (
          <div className="hidden md:flex flex-1 items-center justify-end gap-2">
            <Link
              to="/login"
              className="flex items-center gap-2 text-neutral-800 font-medium px-5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition text-sm shadow-sm"
              style={{ minWidth: "80px" }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 text-white font-medium px-5 py-2 rounded-xl bg-gradient-to-r from-neutral-800 to-black hover:opacity-90 transition"
            >
              <ArrowUpRight size={18} />
              Get Started
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-end gap-2">
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-neutral-800 px-5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition shadow-sm mr-2"
              style={{ minWidth: "80px" }}
            >
              Logout
            </button>
            <button
              onClick={handleDirect}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-neutral-800 to-black hover:opacity-90 transition shadow-sm"
            >
              <UserCircle className="w-5 h-5 text-white" />
              {user.name}
            </button>
          </div>
        )}

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none ml-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 text-sm font-medium text-gray-800 bg-white rounded-2xl shadow-lg px-4 py-4 border border-gray-200">
          <Link to="/about" onClick={toggleMenu} className="nav-link block">
            About
          </Link>
          <Link to="/reviews" onClick={toggleMenu} className="nav-link block">
            Reviews
          </Link>
          <Link to="/pricing" onClick={toggleMenu} className="nav-link block">
            Pricing
          </Link>
          <Link to="/faq" onClick={toggleMenu} className="nav-link block">
            FAQ
          </Link>
          <Link
            to="/login"
            onClick={toggleMenu}
            className="inline-flex items-center gap-2 text-neutral-800 font-medium px-4 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition text-sm shadow-sm w-full justify-center"
            style={{ minWidth: "80px" }}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            onClick={toggleMenu}
            className="inline-flex items-center gap-2 text-white font-medium px-5 py-2 rounded-xl bg-gradient-to-r from-neutral-800 to-black hover:opacity-90 transition w-full justify-center"
          >
            <ArrowUpRight size={18} />
            Get Clover
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

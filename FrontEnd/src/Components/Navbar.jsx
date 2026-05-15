import React, { useState, useContext, useEffect } from "react";
import { Menu, X, UserCircle, Clover } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

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
      .get(`${import.meta.env.VITE_API_BASE_URL}/logout`, { withCredentials: true })
      .then(() => {
        setAuth(false);
        setUser({});
        setWasLoggedInBefore(false);
        navigate("/");
      })
      .catch((err) => console.log("Logout failed:", err));
  };

  const navigate = useNavigate();
  const handleDirect = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, { withCredentials: true });
      if (res.data?.id) {
        navigate(`/users/dashboard/${res.data.id}`);
      } else {
        throw new Error("Invalid user data");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const refresh = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/refresh-token`,
            {},
            { withCredentials: true }
          );
          if (refresh.data.status === "Success") {
            const retryRes = await axios.get("/user", { withCredentials: true });
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
    <nav style={{ background: "#000000", color: "#ffffff" }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          style={{
            fontFamily: DISPLAY_FONT,
            fontWeight: 500,
            fontSize: 20,
            letterSpacing: "0.3px",
            color: "#ffffff",
          }}
        >
          <Clover className="w-6 h-6" style={{ color: "#c1fbd4" }} />
          EvalCode
        </Link>

        {/* Center: Links */}
        <ul
          className="hidden md:flex items-center gap-7"
          style={{ fontSize: 16, fontWeight: 420 }}
        >
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/pricing" className="nav-link">Pricing</Link></li>
          <li><Link to="/reviews" className="nav-link">Reviews</Link></li>
          <li><Link to="/faq" className="nav-link">FAQ</Link></li>
          <li><Link to="/support" className="nav-link">Support</Link></li>
        </ul>

        {/* Right: Buttons */}
        {!auth ? (
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center"
              style={{
                background: "#000000",
                color: "#ffffff",
                border: "2px solid #ffffff",
                borderRadius: 9999,
                padding: "10px 24px",
                fontSize: 16,
                fontWeight: 420,
              }}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center"
              style={{
                background: "#000000",
                color: "#ffffff",
                border: "2px solid #ffffff",
                borderRadius: 9999,
                padding: "10px 24px",
                fontSize: 16,
                fontWeight: 550,
              }}
            >
              Start free trial
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleLogout}
              style={{
                background: "#000000",
                color: "#ffffff",
                border: "2px solid #ffffff",
                borderRadius: 9999,
                padding: "10px 24px",
                fontSize: 16,
                fontWeight: 420,
              }}
            >
              Logout
            </button>
            <button
              onClick={handleDirect}
              className="inline-flex items-center gap-2"
              style={{
                background: "#ffffff",
                color: "#000000",
                borderRadius: 9999,
                padding: "10px 24px",
                fontSize: 16,
                fontWeight: 550,
              }}
            >
              <UserCircle className="w-4 h-4" />
              {user.name}
            </button>
          </div>
        )}

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none ml-2"
          style={{ color: "#ffffff" }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className="md:hidden px-6 py-6 space-y-4"
          style={{ background: "#000000", color: "#ffffff", fontSize: 16 }}
        >
          <Link to="/about" onClick={toggleMenu} className="nav-link block">About</Link>
          <Link to="/pricing" onClick={toggleMenu} className="nav-link block">Pricing</Link>
          <Link to="/reviews" onClick={toggleMenu} className="nav-link block">Reviews</Link>
          <Link to="/faq" onClick={toggleMenu} className="nav-link block">FAQ</Link>
          <Link to="/support" onClick={toggleMenu} className="nav-link block">Support</Link>
          <Link
            to="/login"
            onClick={toggleMenu}
            className="block text-center"
            style={{
              background: "#000000",
              color: "#ffffff",
              border: "2px solid #ffffff",
              borderRadius: 9999,
              padding: "10px 24px",
              fontSize: 16,
            }}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            onClick={toggleMenu}
            className="block text-center"
            style={{
              background: "#000000",
              color: "#ffffff",
              border: "2px solid #ffffff",
              borderRadius: 9999,
              padding: "10px 24px",
              fontSize: 16,
              fontWeight: 550,
            }}
          >
            Start free trial
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

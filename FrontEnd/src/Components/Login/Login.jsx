import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const Login = () => {
  const navigate = useNavigate();
  const { setAuth, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        formData,
        { withCredentials: true }
      );

      if (res.data.status === "Success") {
        setAuth(true);
        setUser({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
        });
        navigate(`/users/dashboard/${res.data.user.id}`);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
      } else {
        setErrors({
          email: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "#ffffff",
    color: "#000000",
    border: `1px solid ${errors[field] ? "#dc2626" : "#e4e4e7"}`,
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 16,
    fontWeight: 420,
    outline: "none",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fbfbf5",
        color: "#000000",
        paddingTop: 48,
        paddingBottom: 48,
      }}
      className="flex items-center justify-center px-4"
    >
      <div
        className="flex w-full max-w-6xl overflow-hidden"
        style={{
          background: "#ffffff",
          borderRadius: 20,
          boxShadow:
            "0 8px 8px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.06), 0 2px 2px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2" style={{ background: "#000000" }}>
          <img
            src="/login.jpg"
            alt="Login visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14">
          <h1
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: 48,
              fontWeight: 330,
              lineHeight: 1.14,
            }}
          >
            Welcome back.
          </h1>
          <p
            className="mt-2"
            style={{ color: "#52525b", fontSize: 16, fontWeight: 420, lineHeight: 1.5 }}
          >
            Log in to your EvalCode workspace.
          </p>

          {/* Google */}
          <button
            className="w-full flex items-center justify-center gap-3 mt-8"
            style={{
              background: "#ffffff",
              color: "#000000",
              border: "1px solid #000000",
              borderRadius: 9999,
              padding: "12px 24px",
              fontSize: 16,
              fontWeight: 420,
            }}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px" style={{ background: "#e4e4e7" }} />
            <span
              className="px-4 uppercase"
              style={{
                color: "#71717a",
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.72px",
              }}
            >
              Or login with email
            </span>
            <div className="flex-grow h-px" style={{ background: "#e4e4e7" }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.28px",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle("email")}
              />
              {errors.email && (
                <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.28px",
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    color: "#52525b",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "-0.13px",
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle("password")}
              />
              {errors.password && (
                <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full"
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
              Log in
            </button>
          </form>

          <p
            className="text-center mt-6"
            style={{ color: "#52525b", fontSize: 14, fontWeight: 500, letterSpacing: "0.28px" }}
          >
            Don’t have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "#000000", fontWeight: 550, textDecoration: "underline" }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

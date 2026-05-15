import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const Signup = () => {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setAuth, setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...dataToSend } = users;

    let newErrors = {};
    if (users.password !== users.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!users.name.trim()) newErrors.name = "Name is required";
    if (!users.email.trim()) newErrors.email = "Email is required";
    if (!users.password) newErrors.password = "Password is required";
    if (!users.confirmPassword) newErrors.confirmPassword = "Confirm your password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/register`, dataToSend)
      .then((res) => {
        if (res.data.status === "Success") {
          axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/user`, { withCredentials: true })
            .then((userRes) => {
              setUser(userRes.data);
              setAuth(true);
              navigate(`/users/dashboard/${userRes.data.id}`);
            })
            .catch(() => {
              setAuth(true);
              navigate("/login");
            });
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          const errorMsg = err.response.data.error?.toLowerCase() || "";
          if (errorMsg.includes("email")) {
            setErrors({ email: "Email already in use" });
          } else if (errorMsg.includes("name")) {
            setErrors({ name: "Username already taken" });
          } else {
            setErrors({ email: "Registration error" });
          }
        } else {
          setErrors({ email: "Something went wrong. Please try again." });
        }
      });
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
        <div className="hidden md:block md:w-1/2" style={{ background: "#000000" }}>
          <img
            src="/login.jpg"
            alt="Signup visual"
            className="h-full w-full object-cover"
            style={{ minHeight: "400px", maxHeight: "640px" }}
          />
        </div>

        <div className="w-full md:w-1/2 p-10 md:p-14">
          <h1
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: 48,
              fontWeight: 330,
              lineHeight: 1.14,
            }}
          >
            Start free trial.
          </h1>
          <p
            className="mt-2"
            style={{ color: "#52525b", fontSize: 16, fontWeight: 420, lineHeight: 1.5 }}
          >
            Join us and start your journey.
          </p>

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
            Sign up with Google
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
              Or sign up with email
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
                Name
              </label>
              <input
                type="text"
                name="name"
                value={users.name}
                onChange={handleChange}
                style={inputStyle("name")}
              />
              {errors.name && (
                <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.name}</p>
              )}
            </div>

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
                value={users.email}
                onChange={handleChange}
                style={inputStyle("email")}
              />
              {errors.email && (
                <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.email}</p>
              )}
            </div>

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
                Password
              </label>
              <input
                type="password"
                name="password"
                value={users.password}
                onChange={handleChange}
                style={inputStyle("password")}
              />
              {errors.password && (
                <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.password}</p>
              )}
            </div>

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
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={users.confirmPassword}
                onChange={handleChange}
                style={inputStyle("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full"
              style={{
                background: "#c1fbd4",
                color: "#000000",
                borderRadius: 9999,
                padding: "12px 24px",
                fontSize: 16,
                fontWeight: 550,
                border: "none",
              }}
            >
              Start free trial
            </button>
          </form>

          <p
            className="text-center mt-6"
            style={{ color: "#52525b", fontSize: 14, fontWeight: 500, letterSpacing: "0.28px" }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#000000", fontWeight: 550, textDecoration: "underline" }}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

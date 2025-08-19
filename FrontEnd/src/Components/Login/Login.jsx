import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth, setUser } = useContext(AuthContext);

  // Form state
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate before submit
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post("/api/login", formData, {
        withCredentials: true,
      });

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

  // Dynamic input class
  const inputClass = (field) =>
    `w-full px-4 py-2 rounded-lg border ${
      errors[field] ? "border-red-500" : "border-gray-300"
    } bg-gray-100 focus:outline-none focus:ring-2 ${
      errors[field] ? "focus:ring-red-500" : "focus:ring-black"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-6xl shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* Left Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/login.jpg"
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10 md:p-14">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand</h1>
          <p className="text-gray-500 text-sm mb-8">Welcome back!</p>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition mb-6">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium text-sm text-gray-700">
              Sign in with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="px-4 text-sm text-gray-400">
              OR LOGIN WITH EMAIL
            </span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-gray-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            OR{" "}
            <Link to="/signup" className="text-black font-medium hover:underline">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

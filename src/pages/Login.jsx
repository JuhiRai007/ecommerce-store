import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      login({
        id: Date.now(), 
        username: form.username.trim(),
      });
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch {
      setError("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-12 w-full max-w-md flex flex-col items-center animate-fadeIn">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Login to Your Account</h1>
        {error && (
          <div className="w-full mb-4 text-red-600 text-sm px-3 py-2 bg-red-50 rounded-md border border-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
          {/* Username */}
          <label className="block">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Username"
              required
            />
          </label>
          {/* Password */}
          <label className="block">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Password"
              required
            />
          </label>
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg text-lg font-semibold shadow-lg transition disabled:opacity-60 ${loading ? "cursor-not-allowed" : ""}`}
            aria-label="Login"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

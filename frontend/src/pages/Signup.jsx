import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    state: "",
    area: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg border p-8 space-y-6"
        >
          <h2 className="text-xl font-semibold text-center">Create Account</h2>

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="user">Citizen</option>
            <option value="admin">Admin</option>
          </select>

          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
            required
          >
            <option value="">Select State</option>
            <option value="uttar pradesh">Uttar Pradesh</option>
            <option value="bihar">Bihar</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="karnataka">Karnataka</option>
          </select>

          <input
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="Area (optional)"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Create Account
          </button>

          <p
            onClick={() => navigate("/login")}
            className="text-sm text-center text-blue-600 cursor-pointer"
          >
            Already have an account? Sign in
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

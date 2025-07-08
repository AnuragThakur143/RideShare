import { useState } from "react";
import { apiRequest } from "./api.jsx";

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("RIDER");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await apiRequest("/auth/signup", "POST", {
        name,
        email,
        password,
        role,
      });
      setSuccess("Signup successful! Please log in.");
      setTimeout(() => {
      onSignup && onSignup();
      }, 2000);
    } catch (err) {
      setError(err.message + " An error occurred during signup.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        placeholder="Name"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="RIDER">Rider</option>
        <option value="DRIVER">Driver</option>
      </select>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
}

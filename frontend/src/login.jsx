import { useState } from "react";
import { apiRequest } from "./api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiRequest("/auth/login", "POST", {email, password});
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.id);
      onLogin && onLogin(data);
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login." + " (" + err.message + ")" );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition font-semibold"
      >
        Login
      </button>
    </form>
  );
}

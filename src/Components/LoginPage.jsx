import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hardcoded simple authentication
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!username || !password) {
      alert("Enter username and password!");
      return;
    }

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      localStorage.setItem("isLoggedIn", true);
      navigate("/tasks");
    } else {
      alert("Invalid Credentials!");
    }
  };

  const handleRegister = () => {
    if (!username || !password) {
      alert("Enter username and password!");
      return;
    }
    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
    navigate("/tasks");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login / Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            onClick={handleLogin}
            className="w-1/2 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="w-1/2 bg-green-500 text-white py-2 rounded-lg font-semibold ml-2 hover:bg-green-600"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

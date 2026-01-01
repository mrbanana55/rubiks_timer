import React, { useState } from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (!response.ok) {
        setError("Invalid email or password");
        return;
      }
      const data = await response.json();
      login(data.token);
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleClick}
      className="flex flex-col shadow-xl rounded-lg min-w-md px-6 py-8 bg-white border border-gray-200 space-y-4"
    >
      <label htmlFor="email" className="text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        placeholder="john@email.com"
        id="email"
        required
        onBlur={() => setEmailTouched(true)}
        className={`px-4 py-2 rounded-md border border-gray-300 focus:ring-2 ${
          emailTouched && !email
            ? "border-red-500 focus-within:ring-red-400"
            : "focus:ring-blue-500"
        } focus:outline-none transition duration-200`}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailTouched && !email && (
        <p className=" text-right text-xs text-red-500">Email is required</p>
      )}

      <label htmlFor="password" className="text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        required
        placeholder="Password"
        id="password"
        onBlur={() => setPasswordTouched(true)}
        className={`px-4 py-2 rounded-md border border-gray-300 focus:ring-2 ${
          passwordTouched && !password
            ? "border-red-500 focus-within:ring-red-400"
            : "focus:ring-blue-500"
        } focus:outline-none transition duration-200`}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordTouched && !password && (
        <p className="text-right text-xs text-red-500">Password is required</p>
      )}

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Login
      </button>
      {error && <p className="text-center text-red-500 text-xs">{error}</p>}
      <p className="text-center text-sm text-gray-500">
        Don't have an account?
        <a href="/signup" className="ml-2 text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;

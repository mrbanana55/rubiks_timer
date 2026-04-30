import React, { useState } from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password) return;
    if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to register. Email might already be in use.");
        return;
      }
      
      const data = await response.json();
      setSuccess(true);
      
      // Notify user and then redirect
      setTimeout(() => {
        login(data.token);
        navigate("/profile");
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center shadow-xl rounded-lg min-w-[384px] px-6 py-12 bg-white border border-gray-200 space-y-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {name}!</h2>
        <p className="text-gray-600">Your account has been created successfully.</p>
        <p className="text-sm text-gray-400">Redirecting to your profile...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col shadow-xl rounded-lg min-w-[384px] px-6 py-8 bg-white border border-gray-200 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
      
      <label htmlFor="name" className="text-sm font-medium text-gray-700">
        Full Name
      </label>
      <input
        type="text"
        placeholder="John Doe"
        id="name"
        required
        onBlur={() => setNameTouched(true)}
        className={`px-4 py-2 rounded-md border border-gray-300 focus:ring-2 ${
          nameTouched && !name
            ? "border-red-500 focus-within:ring-red-400"
            : "focus:ring-blue-500"
        } focus:outline-none transition duration-200`}
        onChange={(e) => setName(e.target.value)}
      />
      {nameTouched && !name && (
        <p className="text-right text-xs text-red-500">Name is required</p>
      )}

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
        <p className="text-right text-xs text-red-500">Email is required</p>
      )}

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          placeholder="Password"
          id="password"
          onBlur={() => setPasswordTouched(true)}
          className={`px-4 py-2 rounded-md border border-gray-300 w-full focus:ring-2 ${
            passwordTouched && (password.length < 6)
              ? "border-red-500 focus-within:ring-red-400"
              : "focus:ring-blue-500"
          } focus:outline-none transition duration-200`}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-[10px] text-gray-400">Minimum 6 characters</p>
        {passwordTouched && password.length < 6 && (
          <p className="text-right text-xs text-red-500">Password is too short</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mt-2"
      >
        Sign Up
      </button>
      
      {error && <p className="text-center text-red-500 text-xs mt-2">{error}</p>}
      
      <p className="text-center text-sm text-gray-500 pt-2 border-t border-gray-100">
        Already have an account?
        <a href="/login" className="ml-2 text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;

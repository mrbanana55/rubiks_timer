import React from "react";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 rounded-md">
      <LoginForm />
    </div>
  );
};

export default Login;

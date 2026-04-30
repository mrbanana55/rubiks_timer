import React from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../auth/useAuth";

const NavBar: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <Link to={"/"} className="text-2xl font-black text-blue-600 tracking-tighter">
        RUBIK'S TIMER
      </Link>
      <ul className="flex justify-end gap-6 items-center">
        <li>
          <Link to={"/"} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Timer
          </Link>
        </li>
        {!token ? (
          <>
            <li>
              <Link to={"/login"} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Login
              </Link>
            </li>
            <li>
              <Link to={"/signup"} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/profile"} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Profile
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

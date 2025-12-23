import React from "react";
import NavBar from "../components/NavBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

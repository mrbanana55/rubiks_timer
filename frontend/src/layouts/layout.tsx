import NavBar from "../components/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black overflow-x-hidden">
      <header>
        <NavBar />
      </header>
      <main className="mt-15 w-full flex-1">{children}</main>
    </div>
  );
};

export default Layout;

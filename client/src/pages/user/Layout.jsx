import { Outlet } from "react-router-dom";
import { Footer, NavbarUser, SearchBar } from "../../components";

const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <NavbarUser />
          <SearchBar />
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Outlet />
      </main>

      {/* Footer */}
      <div className="flex-grow-0 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

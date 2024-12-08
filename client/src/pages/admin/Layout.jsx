import { Navigate, Outlet } from "react-router-dom";
import { NavbarAdmin, Sidebar } from "../../components";
import { useContext, useEffect } from "react";
import { apiGetUser } from "../../services/user";
import { ShopContext } from "../../context/shopContext";
import toast from "react-hot-toast";

const Layout = () => {
  // if (!allowedRoles.includes(userRole)) {
  //   return <Navigate to="/NotFound" replace />; // Chuyển hướng đến trang NotFound hoặc Unauthorized
  // }

  const { accessToken, setAllUsers } = useContext(ShopContext);

  // get All Users
  useEffect(() => {
    (async () => {
      const data = await apiGetUser(accessToken);
      if (data.success) {
        setAllUsers(data.data);
      } else {
        console.log(data.message);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <hr />
      <div className="flex w-full">
        <Sidebar />
        <div className="mx-auto my-8 ml-[max(5vw,25px)] w-[70%] text-base text-gray-600">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

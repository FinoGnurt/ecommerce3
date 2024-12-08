import { assets } from "../../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { apiLogout } from "../../services/user";
import toast from "react-hot-toast";

const navLink = [
  { id: 1, path: "/", name: "home" },
  { id: 2, path: "/products", name: "products" },
  { id: 3, path: "/about", name: "about" },
  { id: 4, path: "/contact", name: "contact" },
];

const menu = [
  { id: 1, path: "/admin/add", name: "Admin" },
  { id: 2, path: "/profile", name: "Profile" },
  { id: 3, path: "/about", name: "Order" },
  { id: 4, path: "/", name: "Logout" },
];

const Navbar = () => {
  const { setShowSearch, user, setUser, setAccessToken, cartItems } =
    useContext(ShopContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const rs = await apiLogout();
    if (rs.success) {
      toast.success(rs.message);

      localStorage.removeItem("token");
      setUser(null);
      setAccessToken("");
      localStorage.removeItem("user");
      // window.location.reload();
    } else {
      toast.error(rs.message);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user !== null && Object.keys(user).length !== 0) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  //Nếu bạn thấy giá trị user bị mất sau khi reload trang, hãy thêm đoạn sau vào useEffect:
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setAccessToken(token);
      setUser(JSON.parse(savedUser));
    } else {
      setAccessToken("");
      setUser(null);
    }
  }, []);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        {navLink.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `${isActive ? "[&>hr]:!block" : ""} flex flex-col items-center gap-1 uppercase`
            }
          >
            <p>{item.name}</p>
            <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          onClick={() => {
            setShowSearch(true);
            navigate("/products");
          }}
          alt=""
        />

        {isLogin ? (
          <div className="group relative">
            <img
              src={user?.avatar || assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />

            <div className="absolute right-0 hidden pt-4 group-hover:block">
              <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500">
                {menu.map((item) => {
                  // Ẩn mục "Admin" nếu user không phải admin
                  if (item.name === "Admin" && user?.role !== "admin") {
                    return null;
                  }

                  return (
                    <Link to={item.path} key={item.id}>
                      <p
                        className="cursor-pointer hover:text-black"
                        onClick={() => item.name === "Logout" && handleLogout()}
                      >
                        {item.name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="login"
            className="text-base font-medium [&>hr]:hover:!w-full"
          >
            <p>Login</p>
            <hr className="block h-[1.5px] w-0 border-none bg-gray-700 transition-all duration-300" />
          </Link>
        )}

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
            {cartItems.length}
          </p>
        </Link>

        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setMenuVisible(true)}
          alt=""
        />
      </div>

      {/* Sidebar menu for small screens*/}
      <div
        className={`absolute bottom-0 right-0 top-0 h-screen overflow-hidden bg-white transition-all ${menuVisible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex cursor-pointer items-center gap-4 p-3"
            onClick={() => setMenuVisible(false)}
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          {navLink.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className="border py-2 pl-6 uppercase"
              onClick={() => setMenuVisible(false)}
            >
              <p>{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

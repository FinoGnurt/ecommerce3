import { NavLink, Link } from "react-router-dom";
import {
  IoIosAddCircleOutline,
  FaRegUserCircle,
  FaListUl,
  IoCartOutline,
  MdOutlineCategory,
  IoMdBackspace,
} from "../../utils/icons";

const menuSideBar = [
  { path: "/admin/users", name: "Users", icon: <FaRegUserCircle size={20} /> },
  {
    path: "/admin/add",
    name: "Add Product",
    icon: <IoIosAddCircleOutline size={22} />,
  },
  { path: "/admin/list", name: "Products", icon: <FaListUl size={18} /> },
  {
    path: "/admin/brands",
    name: "Brands",
    icon: <MdOutlineCategory size={21} />,
  },
  { path: "/admin/orders", name: "Orders", icon: <IoCartOutline size={21} /> },
];

const Sidebar = () => {
  return (
    <div className="min-h-screen w-[18%] max-w-[250px] border-r-2">
      <div className="flex h-full flex-col justify-between">
        <div className="sticky top-24 flex flex-col gap-4 pl-[20%] text-[15px]">
          {menuSideBar.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `${isActive ? "border-[#C586A5] bg-[#ffebf5]" : ""} flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2`
              }
            >
              {item.icon}
              <p className="hidden md:block">{item.name}</p>
            </NavLink>
          ))}
        </div>

        <div className="sticky bottom-5 flex flex-col gap-4 pl-[20%] pt-6 text-[15px]">
          <Link
            to={"/"}
            className="flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2"
          >
            <IoMdBackspace size={21} />
            <p className="hidden md:block">Quay lại</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

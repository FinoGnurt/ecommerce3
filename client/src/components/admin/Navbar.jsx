import { assets } from "../../assets/admin_assets/assets";

const Navbar = () => {
  return (
    <div className="sticky top-0 flex items-center justify-between bg-white px-[4%] py-2 shadow-md">
      {/* <img src={assets.logo} className="w-[max(10%,80px)]" alt="" /> */}
      <img src={assets.logo} className="w-[max(7%,80px)]" alt="" />
      <button className="rounded-full bg-gray-600 px-5 py-2 text-xs text-white sm:px-7 sm:py-2 sm:text-sm">
        Đăng xuất
      </button>
    </div>
  );
};

export default Navbar;

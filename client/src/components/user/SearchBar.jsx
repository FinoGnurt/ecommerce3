import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { assets } from "../../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("products")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-b border-t bg-gray-50 text-center">
      <div className="mx-3 my-5 inline-flex w-3/4 items-center justify-center rounded-full border border-gray-400 px-5 py-2 sm:w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-inherit text-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} className="w-4" alt="" />
      </div>

      <img
        src={assets.cross_icon}
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;

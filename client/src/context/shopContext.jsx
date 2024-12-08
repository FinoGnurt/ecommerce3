import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { apiGetUser } from "../services/user";
import { apiGetBrands } from "../services/brand";
import { apiGetProducts } from "../services/product";
import { apiAddToCart, apiGetCart } from "../services/cart";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // token
  const [user, setUser] = useState(() => {
    // Khởi tạo user từ localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  const fetchDataUser = async () => {
    try {
      const decodedToken = jwtDecode(accessToken); // Decode token
      if (decodedToken) {
        const rs = await apiGetUser(accessToken, decodedToken._id);
        if (rs.success) {
          setUser(rs.data);
          fetchGetCart();
          localStorage.setItem("user", JSON.stringify(rs.data)); // Lưu vào localStorage
        } else {
          toast.error(rs.message);
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error.message);
      toast.error("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại!");
      localStorage.removeItem("token"); // Xóa token không hợp lệ
      setAccessToken(""); // Đặt lại state
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchDataUser();
    }
  }, [accessToken]);

  // admin: brands
  const [brands, setBrands] = useState([]);

  // GET brand
  useEffect(() => {
    (async () => {
      const data = await apiGetBrands();
      setBrands(data.data);
    })();
  }, []);

  // All Users
  const [allUsers, setAllUsers] = useState([]);

  // All Products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await apiGetProducts();
      setProducts(data.data);
      setLoading(false);
    })();
  }, []);

  // Loading
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (productId, colorId) => {
    const rs = await apiAddToCart(accessToken, productId, colorId);
    if (rs.success) {
      setCartItems([...cartItems, rs.data]);
      toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
    } else {
      toast.error(rs.message);
    }
  };

  console.log(user);
  useEffect(() => {
    fetchGetCart();
  }, [user]);

  const fetchGetCart = async () => {
    const rs = await apiGetCart(accessToken, user._id);
    if (rs.success) {
      setCartItems(rs.data);
    } else {
      console.log(rs.message);
    }
  };

  const value = {
    products,
    setProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    user,
    setUser,
    accessToken,
    setAccessToken,
    brands,
    setBrands,
    allUsers,
    setAllUsers,
    loading,
    setLoading,
    handleAddToCart,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

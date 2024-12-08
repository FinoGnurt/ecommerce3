import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { CartTotal, Title } from "../../components/index";
import { assets } from "../../assets/frontend_assets/assets";
import { GrSubtractCircle, IoMdAddCircleOutline } from "../../utils/icons";
import { formatVNDCurrency } from "../../helpers/formatVNDCurrency";
import {
  apiAddToCart,
  apiCountDeleteCart,
  apiDeleteCart,
} from "../../services/cart";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, setCartItems, accessToken } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setCartData(cartItems);
  }, [cartItems]);

  console.log(cartItems);

  const handleDeleteCart = async (cartId) => {
    const rs = await apiDeleteCart(accessToken, cartId);
    console.log(rs);
    if (rs.success) {
      toast.success(rs.message);
      setCartItems((prev) => prev.filter((item) => item._id !== cartId));
    } else {
      toast.error(rs.message);
    }
  };

  const handleAddCart = async (productId, colorId) => {
    const rs = await apiAddToCart(accessToken, productId, colorId);

    if (rs.success) {
      setCartItems((prev) => {
        const updatedCart = prev.filter((item) => item._id === rs.data._id);
        updatedCart[0].quantity++;
        return [...prev];
      });
    } else {
      toast.error(rs.message);
    }
  };

  const handleSubtractCart = async (cartId) => {
    const rs = await apiCountDeleteCart(accessToken, cartId);

    if (rs.success) {
      if (rs.data) {
        setCartItems((prev) => {
          const updatedCart = prev.filter((item) => item._id === rs.data._id);
          updatedCart[0].quantity--;
          return [...prev];
        });
      } else {
        toast.error("Đã xóa sản phẩm khỏi giỏ hàng!");
        setCartItems((prev) => prev.filter((item) => item._id !== cartId));
      }
    } else {
      toast.error(rs.message);
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1={"GIỎ"} text2={"HÀNG"} />
      </div>
      <div>
        {cartData?.map((item, index) => {
          {
            /* const productData = products.find(
            (product) => product._id === item._id,
          ); */
          }

          return (
            <div
              key={index}
              className="grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4 border-b border-t py-4 text-gray-700 sm:grid-cols-[4fr_2fr_0.5fr]"
            >
              <div className="flex items-start gap-6">
                <img
                  src={item?.productId?.images[0]}
                  className="w-16 sm:w-20"
                  alt=""
                />
                <div>
                  <p className="text-xs font-medium sm:text-lg">
                    {item?.productId?.name}
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <p>
                      {formatVNDCurrency(
                        item?.productId?.colors[0]?.sellingPrice,
                      )}
                    </p>
                    <p className="border bg-slate-50 px-2 sm:px-3 sm:py-1">
                      {item?.productId?.colors[0]?.color}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => handleSubtractCart(item._id)}>
                  <GrSubtractCircle size={22} />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  className="max-w-10 border px-1 py-1 text-center sm:max-w-16 sm:px-2"
                  disabled
                />
                <button
                  onClick={() =>
                    handleAddCart(item.productId._id, item.colorId)
                  }
                >
                  <IoMdAddCircleOutline size={25} />
                </button>
              </div>
              <img
                src={assets.bin_icon}
                className="mr-4 w-4 cursor-pointer sm:w-5"
                onClick={() => handleDeleteCart(item._id)}
                alt=""
              />
            </div>
          );
        })}
      </div>

      <div className="my-20 flex justify-end">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              className="my-8 bg-black px-8 py-3 text-sm text-white"
              // onClick={() => navigate("/place-order")}
            >
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

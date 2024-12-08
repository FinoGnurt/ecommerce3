import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import Title from "./Title";
import { formatVNDCurrency } from "../../helpers/formatVNDCurrency";

const CartTotal = () => {
  const { cartItems } = useContext(ShopContext);
  const [carts, setCarts] = useState([]);
  const [itemTotals, setItemTotals] = useState([]);

  useEffect(() => {
    setCarts(cartItems);
  }, [cartItems]);

  useEffect(() => {
    // Tính tổng cho từng sản phẩm
    const totals = cartItems.map((item) => {
      const productPrice = item.productId.colors[0].sellingPrice; // Giá bán của sản phẩm
      const totalPrice = productPrice * item.quantity; // Tổng tiền của sản phẩm
      return {
        id: item._id,
        name: item.productId.name,
        totalPrice: totalPrice,
      };
    });

    // Cập nhật state với mảng tổng giá của từng sản phẩm
    setItemTotals(totals);
  }, [cartItems]);

  // Tính tổng giá của tất cả các sản phẩm trong giỏ hàng
  const totalCartPrice = itemTotals.reduce(
    (acc, item) => acc + item.totalPrice,
    0,
  );

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="mt-2 flex flex-col gap-2 text-sm">
        {itemTotals.map((item) => (
          <div className="flex justify-between" key={item.id}>
            <p>{item.name}</p>
            <div>
              <p>{formatVNDCurrency(item.totalPrice)}</p>
            </div>
          </div>
        ))}
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p> Free Ship</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{formatVNDCurrency(totalCartPrice)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

import { useContext, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { MdDelete, MdEdit } from "../../utils/icons";
import { formatVNDCurrency } from "../../helpers/formatVNDCurrency";
import { apiDeleteProduct } from "../../services/product";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const List = () => {
  const { products, setProducts, accessToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleDeleteProduct = async (accessToken, productId) => {
    const rs = await apiDeleteProduct(accessToken, productId);
    if (rs.success) {
      toast.success(rs.message);
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );
    } else {
      toast.error(rs.message);
    }
  };

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden grid-cols-[0.3fr_1fr_2fr_1fr_1fr_1fr_1fr] items-center border bg-gray-100 px-2 py-1 text-sm md:grid">
          <b>Stt</b>
          <b>Hình ảnh</b>
          <b>Tên sản phẩm</b>
          <b>Thương hiệu</b>
          <b>Màu sắc</b>
          <b className="text-end">Giá bán</b>
          <b className="text-center">Action</b>
        </div>
        {products?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1.5fr_0.5fr_1fr_1fr_1fr] items-center gap-2 border px-2 py-1 text-sm md:grid-cols-[0.3fr_1fr_2fr_1fr_1fr_1fr_1fr]"
          >
            <p className="hidden md:block">{index + 1}</p>
            <img
              className="hidden w-full max-w-20 md:block"
              src={item.images[0]}
              alt=""
            />
            <p className="capitalize">{item.name}</p>
            <p className="capitalize">{item.brand}</p>
            <div className="flex flex-col">
              {item.colors?.map((color, i) => (
                <div key={i}>
                  <p className="capitalize">{color.color}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-end">
              {item.colors?.map((color, i) => (
                <div key={i}>
                  <p className="capitalize">
                    {formatVNDCurrency(color.sellingPrice)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                className="rounded-full p-1 text-black transition-all duration-200 hover:bg-gray-600 hover:text-green-500"
                onClick={() => {
                  navigate(`/admin/update-product/${item.slug}`);
                }}
              >
                <MdEdit size={25} />
              </button>
              <button
                className="rounded-full p-1 text-black transition-all duration-200 hover:bg-gray-600 hover:text-red-500"
                onClick={() => handleDeleteProduct(accessToken, item._id)}
              >
                <MdDelete size={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;

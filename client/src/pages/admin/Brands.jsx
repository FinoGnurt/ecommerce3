import { useContext, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { MdDelete, MdEdit } from "../../utils/icons";
import { apiDeleteBrand } from "../../services/brand";
import toast from "react-hot-toast";
import { ModalBrand } from "../../components";

const Brands = () => {
  const { accessToken, brands, setBrands } = useContext(ShopContext);
  const [data, setData] = useState({});

  const handleDeleteBrand = async (brandId) => {
    const response = await apiDeleteBrand(accessToken, brandId);
    if (response.success) {
      toast.success(response.message);
      setBrands((prev) => [...prev].filter((brands) => brands._id !== brandId));
      console.log(response);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <div className="flex max-w-80 justify-between">
        <p className="mb-2">Thương hiệu</p>
        <button
          className="mb-2 min-w-16 rounded-md border bg-slate-500 text-white"
          onClick={() => {
            setData({});
            document.getElementById("my_modal").showModal();
          }}
        >
          Thêm
        </button>
      </div>
      <div className="flex max-w-80 flex-col gap-2">
        <div className="grid grid-cols-[1fr_3fr_1fr] items-center border bg-gray-100 px-2 py-1 text-sm">
          <b>Id</b>
          <b>Brand</b>
          <b className="text-center">Action</b>
        </div>
        {brands?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] items-center gap-2 border px-2 py-1 text-sm md:grid-cols-[1fr_3fr_1fr]"
          >
            <p>{index + 1}</p>
            <p className="capitalize">{item.name.toLowerCase()}</p>
            <div className="flex items-center justify-center gap-2">
              <button
                className="rounded-full p-1 text-black transition-all duration-200 hover:bg-gray-600 hover:text-green-500"
                onClick={() => {
                  setData(item);
                  document.getElementById("my_modal").showModal();
                }}
              >
                <MdEdit size={18} />
              </button>
              <button
                className="rounded-full p-1 text-black transition-all duration-200 hover:bg-gray-600 hover:text-red-500"
                onClick={() => handleDeleteBrand(item._id)}
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ModalBrand data={data} />
    </div>
  );
};

export default Brands;

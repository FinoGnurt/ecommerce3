import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { apiAddBrand, apiUpdateBrand } from "../../services/brand";
import { ShopContext } from "../../context/shopContext";

const ModalBrand = ({ data }) => {
  const [inputValue, setInputValue] = useState("");
  const { accessToken, setBrands } = useContext(ShopContext);

  // obj empty => add new || obj not empty => update
  const isObjEmpty =
    data &&
    Object.keys(data).length === 0 &&
    Object.getPrototypeOf(data) === Object.prototype
      ? true
      : false;

  // add brand
  const handleAddBrand = async () => {
    const response = await apiAddBrand(accessToken, { name: inputValue });
    if (response.success) {
      toast.success(response.message);
      setBrands((prev) => [...prev, response.data]);
    } else {
      console.log(response);
      toast.error(response.message);
    }
  };

  // update brand
  const handleUpdateBrand = async () => {
    const response = await apiUpdateBrand(accessToken, data._id, {
      name: inputValue,
    });
    if (response.success) {
      toast.success(response.message);
      setBrands((prev) =>
        prev.map((el) =>
          el._id === data._id ? { ...el, name: inputValue } : el,
        ),
      );
    } else {
      toast.error(response.message);
    }
  };

  return (
    <dialog id="my_modal" className="modal">
      <div className="modal-box max-w-80">
        <h3 className="mb-2 text-lg font-bold">
          {isObjEmpty ? "Thêm thương hiệu!" : "Cập nhật thương hiệu!"}
        </h3>
        {!isObjEmpty && (
          <p className="mb-3">
            Tên thương hiệu hiện tại:
            <span className="capitalize"> {data.name}</span>
          </p>
        )}
        <input
          type="text"
          placeholder={
            isObjEmpty ? "Nhập tên thương hiệu" : "Nhập tên thương hiệu mới"
          }
          className="input input-bordered w-full max-w-xs"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn hover:text-red-500"
              onClick={() => setInputValue("")}
            >
              Hủy
            </button>
          </form>
          <form method="dialog">
            <button
              className="btn hover:text-blue-500"
              onClick={() => {
                isObjEmpty ? handleAddBrand() : handleUpdateBrand();
                setInputValue("");
              }}
            >
              Lưu
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalBrand;

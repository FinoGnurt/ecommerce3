import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ShopContext } from "../../context/shopContext";
import { InputField } from "../index";
import { assets } from "../../assets/frontend_assets/assets";
import { apiUpdateUser } from "../../services/user";
import { check2Obj } from "../../helpers/check2Obj";

const ModalUser = ({ data }) => {
  const { accessToken, setAllUsers } = useContext(ShopContext);
  const [inputValue, setInputValue] = useState({
    name: data.name ?? "",
    email: data.email ?? "",
    mobile: data.mobile ?? "",
    address: data.address ?? "",
    avatar: data.avatar ?? "",
    role: data.role ?? "",
  });

  const resetValues = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    avatar: data.avatar ?? "",
    role: data.role ?? "",
  };

  // update brand
  const handleUpdateBrand = async () => {
    const dataChange = check2Obj(data, inputValue);
    const response = await apiUpdateUser(accessToken, data._id, dataChange);
    if (response.success) {
      toast.success(response.message);
      setAllUsers((prev) =>
        prev.map((item) =>
          item._id === data._id ? { ...item, ...dataChange } : item,
        ),
      );
    } else {
      toast.error(response.message);
    }
  };

  return (
    <dialog id="my_modal" className="modal">
      <div className="modal-box max-w-[500px]">
        <h3 className="mb-2 text-center text-lg font-bold">
          Cập nhật người dùng
        </h3>
        <div className="flex flex-col gap-3">
          <div className="avatar flex w-full justify-center">
            <div className="w-28 rounded-lg">
              <img src={inputValue.avatar || assets.images} />
            </div>
          </div>
          <div className="flex w-full justify-between gap-2">
            <InputField
              name={"Họ tên"}
              placeholder={data.name}
              value={inputValue.name}
              setValue={(e) =>
                setInputValue((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <select
              className="select select-bordered w-24 min-w-28 max-w-xs"
              value={inputValue.role || data.role}
              onChange={(e) =>
                setInputValue((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <option value="admin">ADMIN</option>
              <option value="user">USER</option>
            </select>
          </div>
          <InputField
            name={"Email"}
            placeholder={data.email}
            value={inputValue.email}
            setValue={(e) =>
              setInputValue((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <InputField
            name={"Số điện thoại"}
            placeholder={data.mobile || "Không có"}
            value={inputValue.mobile}
            setValue={(e) =>
              setInputValue((prev) => ({ ...prev, mobile: e.target.value }))
            }
          />
          <InputField
            name={"Địa chỉ"}
            placeholder={data.address || "Không có"}
            value={inputValue.address}
            setValue={(e) =>
              setInputValue((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn hover:text-red-500"
              onClick={() => setInputValue(resetValues)}
            >
              Hủy
            </button>
          </form>
          <form method="dialog">
            <button
              className="btn hover:text-blue-500"
              onClick={() => {
                handleUpdateBrand();
                setInputValue(resetValues);
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

export default ModalUser;

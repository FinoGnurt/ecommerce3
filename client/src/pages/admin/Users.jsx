import { useContext, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { formatDateNoDetail } from "../../helpers/formatDate";
import { MdDelete, MdEdit } from "../../utils/icons";
import { apiDeleteUser } from "../../services/user";
import toast from "react-hot-toast";
import { ModalUser } from "../../components";

const Users = () => {
  const { allUsers, accessToken, setAllUsers, user } = useContext(ShopContext);
  const [dataUser, setDataUser] = useState({});

  const handleDeleteUser = async (userId) => {
    const rs = await apiDeleteUser(accessToken, userId);
    if (rs.success) {
      toast.success(rs.message);
      setAllUsers((prev) => prev.filter((item) => item._id !== userId));
    } else {
      toast.error(rs.message);
    }
  };

  return (
    <>
      <p className="mb-2">All Users</p>
      <div className="flex flex-col gap-2">
        <div className="hidden grid-cols-[0.5fr_3fr_2fr_1.5fr_1fr_1fr_1fr] items-center border bg-gray-100 px-2 py-1 text-sm md:grid">
          <b>Stt</b>
          <b>Email</b>
          <b>Họ Tên</b>
          <b>Số điện thoại</b>
          <b>Ngày tạo</b>
          <b className="text-center">Vai trò</b>
          <b className="text-center">Action</b>
        </div>
        {allUsers?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 border px-2 py-1 text-sm md:grid-cols-[0.5fr_3fr_2fr_1.5fr_1fr_1fr_1fr]"
          >
            <p>{index + 1}</p>
            <p>{item.email}</p>
            <p>{item.name}</p>
            <p>{item.mobile || "Không có"}</p>
            <p>{formatDateNoDetail(item.createdAt)}</p>
            <p className="text-center uppercase">{item.role}</p>
            <div className="flex items-center justify-center gap-2">
              <button
                className="rounded-full p-1 text-black transition-all duration-200 hover:bg-gray-600 hover:text-green-500"
                onClick={() => {
                  setDataUser(item);
                  document.getElementById("my_modal").showModal();
                }}
              >
                <MdEdit size={18} />
              </button>
              {item._id !== user._id && (
                <button
                  className="rounded-full p-1 text-black transition-all duration-200 hover:bg-gray-600 hover:text-red-500"
                  onClick={() => handleDeleteUser(item._id)}
                >
                  <MdDelete size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ModalUser data={dataUser} />
    </>
  );
};

export default Users;

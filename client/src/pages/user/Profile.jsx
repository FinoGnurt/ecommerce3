import { useContext, useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, MdEdit } from "../../utils/icons";
import { ShopContext } from "../../context/shopContext";
import { apiUpdateUser } from "../../services/user";
import { getDifferences } from "../../helpers";
import toast from "react-hot-toast";
import { assets } from "../../assets/frontend_assets/assets";
import { Navigate } from "react-router-dom";
import uploadToCloudinary from "../../helpers/uploadImage";

const Profile = () => {
  const { user, setUser, accessToken } = useContext(ShopContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState(user);
  const [newPassword, setNewPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [previewImage, setPreviewImage] = useState(
    data?.avatar || assets.images,
  );
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      console.log(objectURL);
      setPreviewImage(objectURL);
    } else {
      console.error("No file selected or invalid file");
    }
  };

  const handleUpdate = async () => {
    if (isUpdate) {
      let urlImg = previewImage; // Giữ nguyên URL preview nếu không có thay đổi
      if (fileInputRef.current?.files[0]) {
        const file = fileInputRef.current.files[0];
        const result = await uploadToCloudinary(file); // Upload ảnh lên Cloudinary
        console.log(result);
        urlImg = result.secure_url;
        console.log("Cloudinary Image URL:", urlImg);
      }
      console.log(data._id);
      const newDataWithImage = { ...data, avatar: urlImg }; // Cập nhật ảnh mới từ Cloudinary
      const differences = getDifferences(user, newDataWithImage);
      console.log(differences);
      const rs = await apiUpdateUser(accessToken, data._id, differences);

      if (rs.success) {
        toast.success(rs.message);
        setUser(newDataWithImage); // Cập nhật user mới vào context
        setData(newDataWithImage);
        setIsUpdate(false);
      } else {
        toast.error(rs.message);
        setIsUpdate(true);
        return;
      }
    } else {
      setIsUpdate(true);
    }
  };

  useEffect(() => {
    if (!user || !user._id) {
      toast.error("Bạn cần đăng nhập để xem trang này!");
      Navigate("/login"); // Điều hướng tới trang đăng nhập nếu không có user
    }
  }, [user]);
  return (
    <div className="blue flex flex-grow flex-col items-center justify-center">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className={`${isUpdate && "group cursor-pointer"}`}>
          {/* Avatar */}
          <div
            className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 translate-y-1/4 transform overflow-hidden rounded-full border-4 border-white bg-cover bg-center shadow-xl"
            style={{
              backgroundImage: `url(${previewImage})`,
            }}
          ></div>

          {isUpdate && (
            <div>
              {/* Edit Overlay */}
              <div className="absolute left-1/2 top-0 flex h-32 w-32 -translate-x-1/2 translate-y-1/4 transform items-center justify-center overflow-hidden rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <MdEdit size={45} className="text-white" />
              </div>

              {/* File Input */}
              <input
                type="file"
                accept="image/*"
                className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 translate-y-1/4 transform cursor-pointer opacity-0"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </div>
          )}
        </div>

        <div className="mt-40 text-center">
          <h1 className="text-3xl font-semibold">
            {isUpdate ? (
              <input
                type="email"
                placeholder="Nhập email mới"
                className="w-2/3 rounded-md border-2 border-slate-300 p-1 text-center text-2xl font-medium outline-none focus:ring-2 focus:ring-blue-400"
                value={data?.name || "name"}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            ) : (
              <p>{data?.name || "example name"}</p>
            )}
          </h1>
          <span className="text-lg uppercase text-gray-600">
            {data.role || "user"}
          </span>
        </div>
        <div className="mx-6">
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="w-1/2 text-lg font-bold text-gray-700">Email:</p>
            {isUpdate ? (
              <input
                type="email"
                placeholder="Nhập email mới"
                className="w-full rounded-md border-2 border-slate-300 p-1 font-medium outline-none focus:ring-2 focus:ring-blue-400"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            ) : (
              <span className="w-full p-1 font-medium">{data.email}</span>
            )}
          </div>
          {isUpdate && (
            <div className="relative mt-3 flex items-center justify-between gap-2">
              <p className="w-1/2 text-lg font-bold text-gray-700">Mật khẩu:</p>
              <input
                type={typePassword}
                placeholder="Nhập mật khẩu mới"
                className="w-full rounded-md border-2 border-slate-300 p-1 pr-9 font-medium outline-none focus:ring-2 focus:ring-blue-400"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {typePassword === "text" && (
                <FaEye
                  className="absolute right-2 cursor-pointer"
                  size={20}
                  onClick={() => setTypePassword("password")}
                />
              )}
              {typePassword === "password" && (
                <FaEyeSlash
                  className="absolute right-2 cursor-pointer"
                  size={20}
                  onClick={() => setTypePassword("text")}
                />
              )}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="w-1/2 text-lg font-bold text-gray-700">
              Số điện thoại:
            </p>
            {isUpdate ? (
              <input
                type="email"
                placeholder="Nhập số điện thoại mới"
                className="w-full rounded-md border-2 border-slate-300 p-1 font-medium outline-none focus:ring-2 focus:ring-blue-400"
                value={data.mobile || ""}
                onChange={(e) => setData({ ...data, mobile: e.target.value })}
              />
            ) : (
              <span className="w-full p-1 font-medium">
                {data.mobile || "Không có"}
              </span>
            )}
          </div>
          <div
            className={`mt-3 flex justify-between gap-2 ${isUpdate ? "items-center" : "[&>p]:mt-[2px]"}`}
          >
            <p className="w-1/2 text-lg font-bold text-gray-700">Địa chỉ:</p>
            {isUpdate ? (
              <input
                type="text"
                placeholder="Nhập địa chỉ mới"
                className="w-full rounded-md border-2 border-slate-300 p-1 font-medium outline-none focus:ring-2 focus:ring-blue-400"
                value={data.address || ""}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            ) : (
              <span className="w-full break-all p-1 font-medium">
                {data.address || "Không có"}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-around text-center">
          {isUpdate && (
            <button
              className="button rounded-full bg-slate-500 px-8 py-3 text-white hover:bg-slate-600"
              onClick={() => {
                setIsUpdate(false);
                setData(user);
                setPreviewImage(user?.avatar);
              }}
            >
              Hủy
            </button>
          )}
          <button
            className="button rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-600"
            onClick={handleUpdate}
          >
            {isUpdate ? "Lưu" : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useContext, useRef, useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import { ShopContext } from "../../context/shopContext";
import { apiAddProduct } from "../../services/product";
import uploadImage from "../../helpers/uploadImage.js";

const Add = () => {
  const { accessToken, brands, setProducts, setLoading } =
    useContext(ShopContext);
  const [dataProduct, setDataProduct] = useState({
    name: "",
    images: [],
    brand: "",
    colors: [],
    information: "",
    description: "",
    bestSeller: false,
  });

  //{ color: "", price: "", sellingPrice: 0 }
  const fileInputRef = useRef(null);

  const onUploadImage = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setDataProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const handleDeleteImage = (index) => {
    const images = [...dataProduct.images];
    images.splice(index, 1);
    setDataProduct((prev) => ({ ...prev, images }));

    // Reset input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddColors = () => {
    const colors = [...dataProduct.colors];
    colors.push({ color: "", price: "", sellingPrice: "" });
    setDataProduct((prev) => ({ ...prev, colors }));
  };

  const handleRemoveColors = (index) => {
    const colors = [...dataProduct.colors];
    colors.splice(index, 1);
    setDataProduct((prev) => ({ ...prev, colors }));
  };

  const onChangeColors = (name, value, index) => {
    const colors = [...dataProduct.colors];
    if (
      (name === "price" && value < 0) ||
      (name === "sellingPrice" && value < 0)
    ) {
      toast.error("Giá tiền không được nhỏ hơn 0.");
      return;
    }
    if (
      name === "sellingPrice" &&
      colors[index].price !== "" &&
      value > colors[index].price
    ) {
      toast.error("Giá sau khi giảm không được lớn hơn giá trước khi giảm.");
      return;
    }
    colors[index][name] = value;
    setDataProduct((prev) => ({ ...prev, colors }));
  };

  // add product
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadedImages = await Promise.all(
      dataProduct.images.map((image) => uploadImage(image)),
    ); // return arr URL of uploaded images

    const payload = {
      name: dataProduct.name || "",
      images: uploadedImages || [],
      brand: dataProduct.brand || "",
      colors: dataProduct.colors || [],
      information: dataProduct.information || "",
      description: dataProduct.description || "",
      bestSeller: dataProduct.bestSeller,
    };

    const response = await apiAddProduct(payload, accessToken);
    if (response.success) {
      toast.success(response.message);
      setProducts((prev) => [...prev, response.data]);
      setDataProduct({
        name: "",
        images: [],
        brand: "",
        colors: [],
        information: "",
        description: "",
        bestSeller: false,
      });
    } else {
      toast.error(response.message);
    }

    setLoading(false);
  };

  return (
    <form
      className="flex w-full flex-col items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      {/* ảnh sản phẩm */}
      <div>
        <p className="mb-2">Ảnh sản phẩm*</p>
        <div className="flex gap-2">
          {dataProduct?.images?.map((image, index) => (
            <label key={index} className="group relative">
              <img
                src={URL.createObjectURL(image)}
                className="aspect-square w-32 cursor-zoom-in"
                alt=""
              />
              <MdDelete
                size={35}
                className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-gray-600 p-1 text-white opacity-0 transition-all duration-200 hover:bg-slate-200 hover:text-red-500 group-hover:opacity-100"
                onClick={() => handleDeleteImage(index)}
              />
            </label>
          ))}
          <label>
            <img
              src={assets.upload_area}
              htmlFor="image"
              className="w-32 cursor-pointer"
              alt=""
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              multiple
              onChange={onUploadImage}
              ref={fileInputRef}
            />
          </label>
        </div>
      </div>

      {/* tên sản phẩm */}
      <div className="w-full">
        <p className="mb-2">Tên sản phẩm*</p>
        <input
          type="text"
          placeholder="Type here"
          className="select_input_textarea w-full max-w-[514px] px-3 py-2"
          required
          value={dataProduct.name}
          onChange={(e) =>
            setDataProduct((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      {/* thông tin sản phẩm */}
      <div className="w-full">
        <p className="mb-2">Thông tin sản phẩm*</p>
        <textarea
          type="text"
          placeholder="Write content here"
          className="select_input_textarea min-h-[100px] w-[514px] max-w-full resize px-3 py-2"
          required
          value={dataProduct.information}
          onChange={(e) =>
            setDataProduct((prev) => ({ ...prev, information: e.target.value }))
          }
        />
      </div>

      {/* mô tả sản phẩm */}
      <div className="w-full">
        <p className="mb-2">Mô tả sản phẩm</p>
        <textarea
          type="text"
          placeholder="Write content here"
          className="select_input_textarea min-h-[100px] w-[514px] max-w-full resize px-3 py-2"
          required
          value={dataProduct.description}
          onChange={(e) =>
            setDataProduct((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      {/* thương hiệu */}
      <div>
        <p className="mb-2">Thương hiệu*</p>
        <select
          className="select_input_textarea w-full px-3 py-2 capitalize"
          onChange={(e) =>
            setDataProduct((prev) => ({ ...prev, brand: e.target.value }))
          }
          value={dataProduct.brand || "Chọn thương hiệu"}
        >
          <option value="Chọn thương hiệu" disabled>
            Chọn thương hiệu
          </option>
          {brands?.map((brand, index) => (
            <option key={index} value={brand.name} className="capitalize">
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* màu sắc */}
      {dataProduct?.colors?.map((item, index) => (
        <div
          key={index}
          className="group flex w-full flex-col gap-2 sm:flex-row sm:gap-8"
        >
          <div>
            <p className="mb-2">Màu sắc</p>
            <input
              type="text"
              placeholder="đỏ"
              className="select_input_textarea w-full px-3 py-2 sm:w-[150px]"
              value={item.color}
              onChange={(e) => onChangeColors("color", e.target.value, index)}
            />
          </div>

          <div className="relative">
            <p className="mb-2">Giá trước khi giảm</p>
            <input
              type="number"
              placeholder="100.000.000"
              className="select_input_textarea w-full px-3 py-2 pr-5 [appearance:textfield] sm:w-[150px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
              value={item.price}
              onChange={(e) => onChangeColors("price", e.target.value, index)}
            />
            <p className="absolute right-2 top-0 translate-y-[41px]">đ</p>
          </div>

          <div className="relative">
            <p className="mb-2">Giá sau khi giảm</p>
            <input
              type="number"
              placeholder="100.000.000"
              className="select_input_textarea w-full px-3 py-2 [appearance:textfield] sm:w-[150px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
              value={item.sellingPrice}
              onChange={(e) =>
                onChangeColors("sellingPrice", e.target.value, index)
              }
            />
            <p className="absolute right-2 top-0 translate-y-[42px]">đ</p>
          </div>

          <CiCircleRemove
            size={35}
            className="right-0 -translate-x-5 translate-y-[35px] cursor-pointer rounded-full opacity-0 hover:text-red-600 group-hover:opacity-100"
            onClick={() => handleRemoveColors(index)}
          />
        </div>
      ))}

      <button
        type="button"
        className="select_input_textarea mt-4 w-28 bg-white py-2 text-black outline-1 hover:bg-slate-100 hover:outline"
        onClick={handleAddColors}
      >
        Add Colors*
      </button>

      {/* bán chạy */}
      <div className="mt-2 flex gap-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() =>
            setDataProduct((prev) => ({
              ...prev,
              bestSeller: !prev.bestSeller,
            }))
          }
          checked={dataProduct.bestSeller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="mt-4 w-28 bg-black py-3 text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;

import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/admin_assets/assets.js";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import { ShopContext } from "../../context/shopContext.jsx";
import { apiUpdateProduct } from "../../services/product.js";
import uploadImage from "../../helpers/uploadImage.js";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { accessToken, brands, setProducts, products } =
    useContext(ShopContext);
  const { slug } = useParams();
  const [dataProduct, setDataProduct] = useState({
    name: "",
    images: [],
    brand: "",
    colors: [],
    information: "",
    description: "",
    bestSeller: false,
  });
  const [imagePreview, setImagePreview] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [productOld, setProductOld] = useState({});
  const [productId, setProductId] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const product = await products?.filter((item) => item.slug === slug);
      setDataProduct({
        name: product[0]?.name,
        images: product[0]?.images,
        brand: product[0]?.brand,
        colors: product[0]?.colors,
        information: product[0]?.information,
        description: product[0]?.description,
        bestSeller: product[0]?.bestSeller,
      });
      const {
        name,
        images,
        brand,
        colors,
        information,
        description,
        bestSeller,
        _id,
      } = product[0];
      setProductOld({
        name,
        images,
        brand,
        colors,
        information,
        description,
        bestSeller,
      });
      setProductId(product[0]?._id);
      setIsLoading(false);
    })();
  }, []);

  //{ color: "", price: "", sellingPrice: 0 }
  const fileInputRef = useRef(null);

  const onUploadImage = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImagePreview((prev) => [...prev, ...files]);
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
    colors[index][name] = value;
    setDataProduct((prev) => ({ ...prev, colors }));
  };

  // add product
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !Object.keys(productOld).some(
        (key) => key in dataProduct && productOld[key] !== dataProduct[key],
      )
    )
      return toast.error("Bạn chưa cập nhật các giá trị.");

    const imagesUpdate = [...dataProduct.images];

    if (imagePreview.length > 0) {
      const uploadedImages = await Promise.all(
        imagePreview.map((image) => uploadImage(image)),
      );
      imagesUpdate.push(...uploadedImages);
    }

    const payload = {
      name: dataProduct.name || "",
      images: imagesUpdate,
      brand: dataProduct.brand || "",
      colors: dataProduct.colors || [],
      information: dataProduct.information || "",
      description: dataProduct.description || "",
      bestSeller: dataProduct.bestSeller,
    };

    const response = await apiUpdateProduct(accessToken, productId, payload);
    if (response.success) {
      toast.success(response.message);
      setProducts([
        ...products.filter((product) => product.slug !== slug),
        response.data,
      ]);
      navigate("/admin/list");
    } else {
      toast.error(response.message);
    }
  };
  return isLoading ? (
    <div className="flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
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
                src={image}
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
          {imagePreview?.map((image, index) => (
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
          className="select_input_textarea w-full px-3 py-2"
          defaultValue="Chọn thương hiệu"
          onChange={(e) =>
            setDataProduct((prev) => ({ ...prev, brand: e.target.value }))
          }
        >
          <option
            value={dataProduct.brand}
            defaultValue={dataProduct.brand}
            disabled
          >
            Chọn thương hiệu
          </option>
          {brands?.map((brand, index) => (
            <option key={index} value={brand.name}>
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
        className="select_input_textarea mt-4 w-36 bg-white py-2 text-black outline-1 hover:bg-slate-100 hover:outline"
        onClick={handleAddColors}
      >
        Thêm màu sắc*
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
          Thêm vào bán chạy
        </label>
      </div>

      <div className="flex gap-10">
        <button
          type="button"
          className="mt-4 w-28 rounded-sm bg-slate-200 py-2 text-lg font-bold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
          onClick={() => navigate("/admin/list")}
        >
          Hủy
        </button>
        <button
          type="submit"
          className="mt-4 w-28 rounded-sm bg-slate-200 py-2 font-bold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

export default UpdateProduct;

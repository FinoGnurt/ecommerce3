import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shopContext";
import { assets } from "../../assets/frontend_assets/assets";
import { RelatedProducts, StarRating } from "../../components";
import { formatVNDCurrency } from "../../helpers/formatVNDCurrency";

const ProductDetail = () => {
  const { slug } = useParams();
  const { products, handleAddToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState({});

  useEffect(() => {
    (async () => {
      products?.map((item) => {
        if (item.slug === slug) {
          setProductData(item);
          setImage(item.images[0]);
          setColors(item.colors);
          setColor(item.colors[0]);
          return null;
        }
      });
    })();
  }, [slug, products]);

  const handleAddToCartOnClick = (e) => {
    e.preventDefault();
    handleAddToCart(productData._id, color._id);
  };

  return productData ? (
    <div className="border-t-2 p-10 opacity-100 transition-opacity duration-500 ease-in">
      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
        {/* Product Images */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col gap-10">
            <div className="flex w-full justify-center">
              <img src={image} className="h-auto w-2/3" alt="" />
            </div>
            <div className="flex w-full flex-row items-center justify-center md:w-full">
              <div className="flex justify-between gap-3 overflow-auto md:w-3/4">
                {productData.images.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    className="w-[24%] flex-shrink-0 cursor-pointer border-2 sm:mb-3 sm:w-[100px]"
                    onClick={() => setImage(item)}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
          <div className="mt-2 flex items-center gap-1">
            <StarRating value={5} />
            <p className="pl-2">(122)</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="mt-5 text-3xl font-medium text-red-500">
              {formatVNDCurrency(color.sellingPrice)}
            </p>
            <del className="mt-5 text-2xl font-medium">
              {formatVNDCurrency(color.sellingPrice)}
            </del>
          </div>
          <p className="mt-5 whitespace-pre-line text-gray-500 md:w-full">
            {productData.information}
          </p>
          <div className="my-8 flex flex-col gap-4">
            <p>Chọn màu sắc</p>
            <div className="flex gap-2">
              {colors.map((item, index) => (
                <button
                  key={index}
                  className={`border bg-gray-100 px-4 py-2 ${item === color ? "border-orange-500" : ""}`}
                  onClick={() => setColor(item)}
                >
                  {item.color}
                </button>
              ))}
            </div>
          </div>
          <button
            className="bg-black px-8 py-3 text-sm text-white active:bg-gray-700"
            onClick={handleAddToCartOnClick}
          >
            THÊM VÀO GIỎ HÀNG
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="mt-5 flex flex-col gap-1 text-sm text-gray-500">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p className="whitespace-pre-line text-base">
            {productData.description}
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts brand={productData.brand} />
    </div>
  ) : (
    <div className="opacity-0">Product</div>
  );
};

export default ProductDetail;

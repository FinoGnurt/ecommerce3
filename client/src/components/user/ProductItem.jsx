import { useContext } from "react";
import { ShopContext } from "../../context/shopContext";
import { Link } from "react-router-dom";
import { StarRating } from "../index";
import { FaCartPlus } from "../../utils/icons";
import { formatVNDCurrency } from "../../helpers/formatVNDCurrency";

const ProductItem = ({ data }) => {
  const { handleAddToCart } = useContext(ShopContext);

  const handleAddToCartOnClick = (e) => {
    e.preventDefault();
    handleAddToCart(data._id, data.colors[0]._id);
  };

  return (
    <Link
      to={`/product/${data?.slug}`}
      className="cursor-pointer text-gray-700"
    >
      <div className="card card-compact overflow-hidden bg-base-100 shadow-xl">
        <figure>
          <img
            src={data?.images[0]}
            alt={data?.slug}
            className="aspect-square w-48 p-3 transition ease-in-out hover:scale-110"
          />
        </figure>
        <div className="card-body">
          <div className="h-16">
            <h2 className="card-title text-base">{data.name}</h2>
          </div>
          <div className="flex justify-between">
            <p className="capitalize">{data?.brand}</p>
            <StarRating value={1.5} />
          </div>
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
            <b className="text-base font-bold text-[#DE2B3A]">
              {formatVNDCurrency(data?.colors[0].sellingPrice)}
            </b>
            <del className="text-[#707070]">
              {formatVNDCurrency(data?.colors[0].price)}
            </del>
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-outline h-10 min-h-10"
              onClick={handleAddToCartOnClick}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;

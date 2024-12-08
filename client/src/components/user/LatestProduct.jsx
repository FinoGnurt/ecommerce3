import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { ProductItem, Title } from "../index";

const LatestProduct = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1={"SẢN PHẨM"} text2={"MỚI NHẤT"} />
        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab id
          placeat minus possimus, similique ipsa modi expedita rem ducimus.
          Eligendi dolorum inventore necessitatibus rem! Enim quasi incidunt
          excepturi veritatis placeat.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProduct.map((item, index) => (
          <ProductItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default LatestProduct;

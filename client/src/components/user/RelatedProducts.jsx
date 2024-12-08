import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ brand }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => item.brand === brand);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="py-2 text-center text-3xl">
        <Title text1={"SẢN PHẨM"} text2={"LIÊN QUAN"} />
      </div>

      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {related.map((item, index) => (
          <ProductItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

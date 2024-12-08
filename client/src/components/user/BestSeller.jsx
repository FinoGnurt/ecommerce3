import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { ProductItem, Title } from "../index";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  console.log(products);
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl">
        <Title text1={"BÁN"} text2={"CHẠY NHẤT"} />
        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          voluptas unde illo reprehenderit distinctio et laboriosam placeat
          quibusdam aliquid amet ipsum consequatur totam porro nihil, modi ad?
          Dolorum, necessitatibus! Molestiae!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSeller.map((item, index) => (
          <ProductItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

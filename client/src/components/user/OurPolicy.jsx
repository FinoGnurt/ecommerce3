import { assets } from "../../assets/frontend_assets/assets";

const assetsArray = [
  {
    id: 1,
    imgSrc: assets.exchange_icon,
    title: "Easy Exchange Policy",
    text: "We offer hassle free exchange policy",
  },
  {
    id: 2,
    imgSrc: assets.quality_icon,
    title: "7 Days Return Policy",
    text: "We provide 7 days free return policy",
  },
  {
    id: 3,
    imgSrc: assets.support_img,
    title: "Best Customer Support",
    text: "We provide 24/7 customer support",
  },
];

const OurPolicy = () => {
  return (
    <div className="flex flex-col justify-around gap-12 py-20 text-center text-xs text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base">
      {assetsArray.map((item) => (
        <div key={item.id}>
          <img src={item.imgSrc} className="m-auto mb-5 w-12" alt="" />
          <p className="font-semibold">{item.title}</p>
          <p className="text-gray-400">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;

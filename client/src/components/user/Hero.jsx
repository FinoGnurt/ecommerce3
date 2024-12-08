import { assets } from "../../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col border border-gray-400 sm:flex-row">
      {/* Hero Left Side */}
      <div className="flex w-full items-center justify-center py-10 sm:w-1/2 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="h-[2px] w-8 bg-[#414141] md:w-11"></p>
            <p className="text-sm font-medium md:text-base">BÁN CHẠY NHẤT</p>
          </div>
          <h1 className="prata-regular text-3xl leading-relaxed sm:py-3 lg:text-5xl">
            Hàng mới nhất
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold md:text-base">SHOP NOW</p>
            <p className="h-[1px] w-8 bg-[#414141] md:w-11"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <img
        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone-16-pro-km-moi.webp"
        className="w-full sm:w-1/2"
        alt=""
      />
    </div>
  );
};

export default Hero;

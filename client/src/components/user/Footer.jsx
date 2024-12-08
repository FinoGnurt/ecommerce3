import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <>
      <div className="my-10 mt-40 flex grid-cols-[3fr_1fr_1fr] flex-col gap-14 text-sm sm:grid">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full text-gray-600 md:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in
            aliquid sequi quae vero suscipit eum non repellat! Voluptatum, quia.
            Atque corrupti voluptatem eveniet vel? Culpa quidem nihil aperiam
            voluptatibus?
          </p>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+84 362322012</li>
            <li>kieuvantrung.dev@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-center text-sm">
          Copyright 2024@ kieuvantrung.dev - All Right Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;

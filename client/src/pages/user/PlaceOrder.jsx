import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { CartTotal, Title } from "../../components";
import { ShopContext } from "../../context/shopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-14">
      {/* Left Side */}
      <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        />
        <input
          type="text"
          placeholder="Street"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            type="text"
            placeholder="State"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        />
      </div>

      {/* Right Side */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Method Selection */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
              onClick={() => setMethod("stripe")}
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img src={assets.stripe_logo} className="mx-4 h-5" alt="" />
            </div>
            <div
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
              onClick={() => setMethod("razorpay")}
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "razorpay" ? "bg-green-400" : ""}`}
              ></p>
              <img src={assets.razorpay_logo} className="mx-4 h-5" alt="" />
            </div>
            <div
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
              onClick={() => setMethod("cod")}
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="mt-8 w-full text-end">
            <button
              className="bg-black px-16 py-3 text-sm text-white"
              onClick={() => navigate("/orders")}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

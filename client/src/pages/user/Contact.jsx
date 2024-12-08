import { assets } from "../../assets/frontend_assets/assets";
import { NewsletterBox, Title } from "../../components";

const Contact = () => {
  return (
    <>
      <div className="border-t pt-10 text-center text-2xl">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 mb-28 flex flex-col justify-center gap-10 md:flex-row">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="text-xl font-semibold text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: admin@forever.com
          </p>
          <p className="text-xl font-semibold text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm transition-all duration-500 hover:bg-black hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </>
  );
};

export default Contact;

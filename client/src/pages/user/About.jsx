import { assets } from "../../assets/frontend_assets/assets";
import { NewsletterBox, Title } from "../../components";

const About = () => {
  return (
    <>
      <div className="border-t pt-8 text-center text-2xl">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col gap-16 md:flex-row">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            excepturi ipsam quis inventore dignissimos, vero odit animi eveniet
            alias ex iusto quos id blanditiis impedit repellendus adipisci quae
            cum laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
            animi consequuntur repudiandae dolorem iusto soluta impedit nisi
            velit. Accusamus veritatis reiciendis amet quaerat accusantium
            laborum id similique blanditiis impedit soluta.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            vel quasi impedit dignissimos, ut aspernatur harum assumenda libero
            veritatis cum. Suscipit saepe aspernatur repudiandae ipsam
            similique, corrupti quis autem debitis?
          </p>
        </div>
      </div>

      <div className="py-4 text-xl">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="mb-20 flex flex-col text-sm md:flex-row">
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b>Quantity Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia,
            velit! Deleniti voluptas porro pariatur incidunt sequi tenetur
            facilis expedita, culpa rerum modi debitis iure quod ratione
            eligendi nulla excepturi eius!
          </p>
        </div>
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            mollitia perferendis ea rerum iste tenetur sint blanditiis enim
            dolorem ipsum expedita dolorum fugit, facilis quis explicabo,
            distinctio eligendi ratione fuga.
          </p>
        </div>
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia,
            velit! Deleniti voluptas porro pariatur incidunt sequi tenetur
            facilis expedita, culpa rerum modi debitis iure quod ratione
            eligendi nulla excepturi eius!
          </p>
        </div>
      </div>

      <NewsletterBox />
    </>
  );
};

export default About;

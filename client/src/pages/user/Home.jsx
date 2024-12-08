import {
  BestSeller,
  Hero,
  LatestProduct,
  NewsletterBox,
  OurPolicy,
} from "../../components";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestProduct />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;

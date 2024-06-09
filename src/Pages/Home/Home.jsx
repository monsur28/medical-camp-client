import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import AvailableCamp from "./AvailableCamp/AvailableCamp";
import Review from "./Review/Review";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MedCamp | Home</title>
      </Helmet>
      <Banner />
      <AvailableCamp></AvailableCamp>
      <Review></Review>
    </div>
  );
};

export default Home;

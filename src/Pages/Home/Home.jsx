import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import AvailableCamp from "./AvailableCamp/AvailableCamp";
import Review from "./Review/Review";
import HospitalAchievements from "./HospitalAchievements/HospitalAchievements";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MedCamp | Home</title>
      </Helmet>
      <Banner />
      <AvailableCamp></AvailableCamp>
      <HospitalAchievements></HospitalAchievements>
      <Review></Review>
    </div>
  );
};

export default Home;

import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import AvailableCamp from "./AvailableCamp/AvailableCamp";
import Review from "./Review/Review";
import HospitalAchievements from "./HospitalAchievements/HospitalAchievements";
import Sponsors from "./Sponsors/Sponsors";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MedCamp | Home</title>
      </Helmet>
      <Banner />
      <AvailableCamp></AvailableCamp>
      <HospitalAchievements></HospitalAchievements>
      <Sponsors />
      <Review></Review>
    </div>
  );
};

export default Home;

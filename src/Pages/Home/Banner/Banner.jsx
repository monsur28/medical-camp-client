import slide1 from "../../../assets/slide1.jpg";
import slide2 from "../../../assets/slide2.jpg";
import slide3 from "../../../assets/slide3.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <Carousel>
      <div>
        <img src={slide1} className="rounded-xl" />
      </div>
      <div>
        <img src={slide2} className="rounded-xl" />
      </div>
      <div>
        <img src={slide3} className="rounded-xl" />
      </div>
    </Carousel>
  );
};

export default Banner;

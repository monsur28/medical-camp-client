import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const styles = {
  image: {
    transition: "transform 0.5s ease",
  },
  imageHover: {
    transform: "scale(1.05)",
  },
};

const Banner = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={5000}
      showThumbs={false}
      showStatus={false}
      showIndicators={true}
      stopOnHover={false}
      dynamicHeight={false}
    >
      <div>
        <img
          src="https://i.ibb.co/hBL9KzS/Medical-Camp-Slide-1.webp"
          className="rounded-xl object-cover"
          style={styles.image}
          alt="Slide 1"
        />
      </div>
      <div>
        <img
          src="https://i.ibb.co/N2PwTDL/Medical-Camp-Slide-2.webp"
          className="rounded-xl object-cover"
          style={styles.image}
          alt="Slide 2"
        />
      </div>
      <div>
        <img
          src="https://i.ibb.co/QQ3wymH/Medical-Camp-Slide-3.webp"
          className="rounded-xl object-cover"
          style={styles.image}
          alt="Slide 3"
        />
      </div>
    </Carousel>
  );
};

export default Banner;

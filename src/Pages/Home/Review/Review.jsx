import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Review = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedback = [] } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/feedback`);
      return res.data;
    },
  });

  return (
    <div>
      <section
        id="testimonials"
        aria-label="What our customers are saying"
        className="bg-slate-50 py-20 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl md:text-center">
            <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
              What Our Customers Are Saying
            </h2>
          </div>
          <hr className="my-6 border-t border-gray-900" />

          {/* Marquee container with two rows */}
          <div className="overflow-hidden">
            <div className="marquee-container">
              {/* Row 1 (scrolls left) */}
              <div className="marquee-row left-slide">
                {feedback.map((item) => (
                  <div key={item._id} className="marquee-item">
                    <div className="font-[sans-serif] max-w-[410px] h-auto p-6 rounded-lg mx-auto shadow-[0_6px_18px_-6px_rgba(193,195,248)] bg-white relative mt-12">
                      <img
                        src={
                          item.photoURL ||
                          "https://randomuser.me/api/portraits/men/15.jpg"
                        }
                        className="w-16 h-16 rounded-full absolute right-0 left-0 mx-auto -top-7"
                        alt="customer"
                      />
                      <div className="mt-6 text-center">
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.designation}
                          </p>
                        </div>

                        <div className="mt-4">
                          <h2 className="text-lg font-extrabold text-gray-800 mb-2">
                            {item.title}
                          </h2>
                          <p className="text-sm text-gray-800 leading-relaxed">
                            {item.feedback.slice(0, 100)}...
                          </p>
                        </div>

                        <div className="flex justify-center space-x-1 mt-4">
                          {/* Stars */}
                          {[...Array(4)].map((_, index) => (
                            <svg
                              key={index}
                              className={`w-5 ${
                                index < item.rating
                                  ? "fill-[#facc15]"
                                  : "fill-[#CED5D8]"
                              }`}
                              viewBox="0 0 14 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2 (scrolls right) */}
              <div className="marquee-row right-slide">
                {feedback.map((item) => (
                  <div key={item._id} className="marquee-item">
                    <div className="font-[sans-serif] max-w-[410px] h-auto p-6 rounded-lg mx-auto shadow-[0_6px_18px_-6px_rgba(193,195,248)] bg-white relative mt-12">
                      <img
                        src={
                          item.photoURL ||
                          "https://randomuser.me/api/portraits/men/15.jpg"
                        }
                        className="w-16 h-16 rounded-full absolute right-0 left-0 mx-auto -top-7"
                        alt="customer"
                      />
                      <div className="mt-6 text-center">
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.designation}
                          </p>
                        </div>

                        <div className="mt-4">
                          <h2 className="text-lg font-extrabold text-gray-800 mb-2">
                            {item.title}
                          </h2>
                          <p className="text-sm text-gray-800 leading-relaxed">
                            {item.feedback.slice(0, 100)}...
                          </p>
                        </div>

                        <div className="flex justify-center space-x-1 mt-4">
                          {/* Stars */}
                          {[...Array(4)].map((_, index) => (
                            <svg
                              key={index}
                              className={`w-5 ${
                                index < item.rating
                                  ? "fill-[#facc15]"
                                  : "fill-[#CED5D8]"
                              }`}
                              viewBox="0 0 14 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS styles for Marquee effect */}
      <style>{`
    .marquee-container {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Add spacing between the rows */
  }

  .marquee-row {
    display: flex;
    gap: 20px; /* Spacing between items in the row */
    animation-duration: 20s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    opacity: 1;
  }

  .left-slide {
    animation-name: left-slide;
  }

  .right-slide {
    animation-name: right-slide;
  }

  .marquee-item {
    min-width: 410px; /* Adjust the width of each item */
    transition: transform 0.2s ease, opacity 0.5s ease;
  }

  /* Animation for the left sliding row */
  @keyframes left-slide {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    50% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  /* Animation for the right sliding row */
  @keyframes right-slide {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .marquee-item:hover {
    transform: scale(1.05); /* Slight scaling effect on hover */
  }
`}</style>
    </div>
  );
};

export default Review;

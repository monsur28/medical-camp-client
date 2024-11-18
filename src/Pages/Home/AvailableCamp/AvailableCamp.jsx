import { ImPriceTags } from "react-icons/im";
import { MdLocationPin } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { Link } from "react-router-dom";
import useCamp from "../../../Hooks/useCamp";
import useCountCamp from "../useCountCamp";

const AvailableCamp = () => {
  const [camps] = useCamp();
  const [participantCounts] = useCountCamp();
  const displayedCamps = camps.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-200 mb-6">
        Available Camps
      </h2>
      <div className="w-16 mx-auto h-1 bg-gray-800 dark:bg-gray-200 rounded mb-8"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedCamps.map((item) => (
          <div
            key={item.campName}
            className="group relative flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            {/* Image Section */}
            <div className="relative w-1/3">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.campName}
              />
              <p className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
                Participants: {participantCounts[item.campName] || 0}
              </p>
            </div>

            {/* Content Section */}
            <div className="w-2/3 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.campName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {item.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-400 mb-4">
                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <MdLocationPin className="text-xl text-red-500" />
                    <span>{item.location}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <ImPriceTags className="text-xl text-green-500" />
                    <span>${item.fees}</span>
                  </div>

                  {/* Date/Time */}
                  <div className="flex items-center gap-2">
                    <IoIosTime className="text-xl text-blue-500" />
                    <span>{item.dateTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link to="/availableCamps">
          <button
            type="button"
            className="px-6 py-2  text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-colors duration-300"
            style={{
              background: `linear-gradient(90deg, #835D23 0%, #B58130 100%)`,
            }}
          >
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AvailableCamp;

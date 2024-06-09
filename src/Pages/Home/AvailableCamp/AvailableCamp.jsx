import { ImPriceTags } from "react-icons/im";
import useCamp from "../../../Hooks/useCamp";
import { MdLocationPin } from "react-icons/md";
import { IoIosTime } from "react-icons/io";

const AvailableCamp = () => {
  const [camps] = useCamp();
  return (
    <div className="">
      <h2 className="text-6xl text-center">Available Camps</h2>
      <div className="flex-1 h-px sm:w-16 dark:bg-black"></div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {camps.map((item) => (
          <>
            <div
              href="#"
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="relative object-cover w-full h-96 md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
                src={item.image}
                alt=""
              />
              <p className="absolute border border-gray-500 lg:p-1 p-4 bg-green-300 lg:ml-[500px] ml-96 mb-44 rounded-b-xl">
                Participant- {item.participantCount}
              </p>
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.campName}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
                <div className="flex justify-evenly gap-1">
                  <div className="flex items-center gap-2">
                    <MdLocationPin />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <ImPriceTags />
                    {item.fees}
                  </div>
                  <div className="flex items-center gap-2">
                    <IoIosTime />
                    {item.dateTime}
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2 py-2 bg-red-400 font-semibold border border-solid rounded dark:border-gray-800 dark:text-gray-800"
                >
                  Join Camp
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamp;

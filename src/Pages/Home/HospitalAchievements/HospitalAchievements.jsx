import { FaUserMd, FaBed, FaAmbulance, FaHeartbeat } from "react-icons/fa";
import { useEffect, useState } from "react";

const HospitalAchievements = () => {
  const achievements = [
    {
      icon: <FaUserMd className="text-4xl text-blue-500" />,
      number: 100,
      label: "Doctors",
    },
    {
      icon: <FaBed className="text-4xl text-green-500" />,
      number: 500,
      label: "Beds",
    },
    {
      icon: <FaAmbulance className="text-4xl text-red-500" />,
      number: 20,
      label: "Ambulances",
    },
    {
      icon: <FaHeartbeat className="text-4xl text-purple-500" />,
      number: 1000,
      label: "Surgeries",
    },
  ];

  // For animated counting
  const [count, setCount] = useState({});

  useEffect(() => {
    achievements.forEach((achievement) => {
      let start = 0;
      const end = achievement.number;
      const step = end / 100;
      const interval = setInterval(() => {
        if (start < end) {
          start += step;
          setCount((prev) => ({
            ...prev,
            [achievement.label]: Math.floor(start),
          }));
        } else {
          clearInterval(interval);
        }
      }, 50);
    });
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          What Our Hospital Has Achieved
        </h2>
        <hr className="my-4 border-t border-gray-900" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-xl flex items-center justify-center flex-col transition-transform transform hover:scale-105 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
            >
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                {achievement.icon}
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-2">
                {count[achievement.label] || 0}
              </h3>
              <p className="text-lg text-gray-600">{achievement.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalAchievements;

import { FaUserMd, FaBed, FaAmbulance, FaHeartbeat } from "react-icons/fa";

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

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          What Our Hospital Have
        </h2>
        <hr className="my-4 border-t border-gray-900" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md flex items-center justify-center flex-col"
            >
              {achievement.icon}
              <h3 className="text-2xl font-semibold mt-4">
                {achievement.number}
              </h3>
              <p className="text-gray-600">{achievement.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalAchievements;

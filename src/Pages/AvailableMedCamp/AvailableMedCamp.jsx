import { MdLocationPin } from "react-icons/md";
import { ImPriceTags } from "react-icons/im";
import { IoIosTime } from "react-icons/io";
import { useMemo, useState } from "react";
import useCamp from "../../Hooks/useCamp";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Helmet } from "react-helmet-async";
import useCountCamp from "../Home/useCountCamp";

const MySwal = withReactContent(Swal);

const AvailableMedCamp = () => {
  const [camps] = useCamp();
  const axiosSecure = useAxiosSecure();
  const [selectedCamp, setSelectedCamp] = useState(null);
  const { user } = useAuth();
  const [participantCounts, refetch] = useCountCamp();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter camps based on search query
  const filteredCamps = useMemo(() => {
    return camps.filter((camp) => {
      return (
        camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.dateTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.healthcareProfessional
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        camp.fees.includes(searchQuery)
      );
    });
  }, [camps, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openModal = (camp) => {
    setSelectedCamp(camp);
  };

  const closeModal = () => {
    setSelectedCamp(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      MySwal.fire({
        title: "Login Required",
        text: "Please log in to join the camp.",
        icon: "error",
      });
      return;
    }

    const form = e.target;
    const campData = {
      campId: selectedCamp._id,
      campName: selectedCamp.campName,
      campfees: selectedCamp.fees,
      location: selectedCamp.location,
      healthcareProfessional: selectedCamp.healthcareProfessional,
      participantName: form.participantName.value,
      email: form.email.value,
      age: form.age.value,
      phone: form.phone.value,
      gender: form.gender.value,
      emergencyContact: form.emergencyContact.value,
    };

    try {
      const res = await axiosSecure.post("/joinCamp", campData);
      if (res.data.insertedId) {
        refetch();
        MySwal.fire({
          title: "Good job!",
          text: "Your Camp Joining Request is on Pending. Please Pay to Join.",
          icon: "success",
        });
        closeModal();
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.response?.data?.message || "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>MedCamp | Available Camps</title>
      </Helmet>
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Available Camps
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Browse and join medical camps tailored for your needs.
        </p>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search camps by name, date, or healthcare professional"
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full max-w-xl mx-auto border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredCamps.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Animated Image Section */}
              <img
                src={item.image}
                alt={item.campName}
                className="w-full sm:w-1/3 h-64 sm:h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Content Section */}
              <div className="relative sm:w-2/3 p-6 flex flex-col justify-between">
                {/* Badge for Participant Count */}
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
                  Participants: {participantCounts[item.campName] || 0}
                </span>

                {/* Camp Title */}
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {item.campName}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Camp Details */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <MdLocationPin className="text-blue-500" /> {item.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <ImPriceTags className="text-blue-500" /> {item.fees}
                  </div>
                  <div className="flex items-center gap-1">
                    <IoIosTime className="text-blue-500" /> {item.dateTime}
                  </div>
                </div>

                {/* Join Button */}
                <button
                  className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
                  onClick={() => openModal(item)}
                >
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCamp && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 mt-20 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white w-full max-w-md p-8 rounded-lg shadow-lg animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Modal Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Join{" "}
              <span className="text-blue-500">{selectedCamp.campName}</span>
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="participantName"
                placeholder="Participant Name"
                defaultValue={user?.displayName}
                className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                name="email"
                placeholder="Participant Email"
                defaultValue={user?.email}
                className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                name="gender"
                className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                name="emergencyContact"
                type="text"
                placeholder="Emergency Contact"
                className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Animation */}
      <style>{`
        @keyframes slideUp {
        from {
        transform: translateY(20px);
        opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slideUp {
  animation: slideUp 0.5s ease-in-out;
}

      `}</style>
    </div>
  );
};

export default AvailableMedCamp;

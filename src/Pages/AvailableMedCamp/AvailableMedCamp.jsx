import { MdLocationPin } from "react-icons/md";
import useCamp from "../../Hooks/useCamp";
import { ImPriceTags } from "react-icons/im";
import { IoIosTime } from "react-icons/io";
import { useMemo, useState } from "react";
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
      // Example: You can adjust this logic based on your specific search criteria
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

  // Function to handle search input change
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
          text: "Your Camp Joining Request is on Pending Please Pay to Join",
          icon: "success",
        });
        closeModal(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        MySwal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      } else {
        MySwal.fire({
          title: "Error",
          text: "An unexpected error occurred.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>MedCamp | Available Camps</title>
      </Helmet>
      <h2 className="text-6xl text-center">Available Camps</h2>
      <hr className="my-4 border-t border-gray-900" />
      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Search camps by name, date, or healthcare professional"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCamps.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="relative object-cover w-full h-96 md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
              src={item.image}
              alt=""
            />
            <p className="absolute border border-gray-500 lg:p-1 p-4 bg-green-300 lg:ml-[500px] ml-96 mb-44 rounded-b-xl">
              Participant: {participantCounts[item.campName] || 0}
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
                className="mt-4 bg-blue-500 text-white p-2 rounded"
                onClick={() => openModal(item)}
              >
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCamp && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal modal-open">
              <div className="modal-box ">
                <h3 className="font-bold text-lg">
                  Join {selectedCamp.campName}
                </h3>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="campName"
                    placeholder="camp Name"
                    defaultValue={selectedCamp.campName}
                    className="input input-bordered w-full"
                    readOnly
                  />
                  <input
                    type="text"
                    name="campfees"
                    placeholder="Camp Fees"
                    defaultValue={selectedCamp.fees}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedCamp.location}
                    placeholder="location"
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    name="healthcareProfessional"
                    placeholder="healthcareProfessional name"
                    defaultValue={selectedCamp.healthcareProfessional}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    name="participantName"
                    placeholder="Participant Name"
                    defaultValue={user?.displayName}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Participant Email"
                    defaultValue={user?.email}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="input input-bordered w-full"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    className="input input-bordered w-full"
                  />
                  <select name="gender" className="input input-bordered w-full">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <input
                    name="emergencyContact"
                    type="phone"
                    placeholder="Emergency Contact"
                    className="input input-bordered w-full"
                  />
                  <div className="modal-action">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <button type="button" onClick={closeModal} className="btn">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableMedCamp;

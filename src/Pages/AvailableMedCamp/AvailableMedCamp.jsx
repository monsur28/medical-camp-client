import { MdLocationPin } from "react-icons/md";
import useCamp from "../../Hooks/useCamp";
import { ImPriceTags } from "react-icons/im";
import { IoIosTime } from "react-icons/io";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MySwal = withReactContent(Swal);

const AvailableMedCamp = () => {
  const [camps] = useCamp();
  const axiosSecure = useAxiosSecure();
  const [selectedCamp, setSelectedCamp] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const openModal = (camp) => {
    setSelectedCamp(camp);
  };

  const closeModal = () => {
    setSelectedCamp(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const campName = form.campName.value;
    const campfees = form.campfees.value;
    const location = form.location.value;
    const healthcareProfessional = form.healthcareProfessional.value;
    const participantName = user?.displayName;
    const email = user?.email;
    const age = form.age.value;
    const phone = form.phone.value;
    const gender = form.gender.value;
    const emergencyContact = form.emergencyContact.value;
    const campData = {
      campName,
      campfees,
      location,
      healthcareProfessional,
      participantName,
      email,
      age,
      phone,
      gender,
      emergencyContact,
    };

    if (user && user.email) {
      try {
        const res = await axiosSecure.post("/joinCamp", campData);
        if (res.data.insertedId) {
          MySwal.fire({
            title: "Good job!",
            text: "Your Camp Joining Request was successful",
            icon: "success",
          });
          navigate("/availableCamps");
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
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to Join the Camp?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          //   send the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>MedCamp | Available Camps</title>
      </Helmet>
      <h2 className="text-6xl text-center">Available Camps</h2>
      <div className="flex-1 h-px sm:w-16 dark:bg-black"></div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {camps.map((item) => (
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
                    type="number"
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

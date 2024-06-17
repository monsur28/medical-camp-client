import { Helmet } from "react-helmet-async";
import useCamp from "../../../Hooks/useCamp";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { RxUpdate } from "react-icons/rx";
import { useState } from "react";

const ManageCamp = () => {
  const [camps, refetch] = useCamp();
  const axiosSecure = useAxiosSecure();
  const [selectedCamp, setSelectedCamp] = useState(null);

  const openModal = (camp) => {
    setSelectedCamp(camp);
  };

  const closeModal = () => {
    setSelectedCamp(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const campName = form.campName.value;
      const fees = form.campfees.value;
      const location = form.location.value;
      const dateTime = form.dateTime.value;
      const healthcareProfessional = form.healthcareProfessional.value;
      const upDateCampData = {
        campName,
        fees,
        location,
        healthcareProfessional,
        dateTime,
      };
      const response = await axiosSecure.patch(
        `/camps/${selectedCamp._id}`,
        upDateCampData
      );
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${campName} Data has been updated`,
          showConfirmButton: false,
          timer: 1500,
        });
        closeModal(null);
        refetch();
      }
    } catch (error) {
      console.error("Error updating camp:", error);
    }
  };

  const deleteCamp = async (camp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/camps/${camp._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${res.campName} has been deleted.`,
                icon: "success",
              });
            }
          });
        } catch (error) {
          console.error("Error deleting camp:", error);
        }
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>MedCamp | Manage Camps</title>
      </Helmet>
      <div className="flex justify-evenly">
        <h2 className="text-4xl text-center font-semibold">Manage Camps</h2>
        <h2 className="text-4xl text-center font-semibold">
          Total Camps : {camps.length}
        </h2>
      </div>
      <hr className="my-4 border-t border-gray-900" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Camp Name
              </th>
              <th scope="col" className="px-6 py-3">
                Camp Fees
              </th>
              <th scope="col" className="px-6 py-3">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Healthcare Professional
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {camps.map((item, index) => (
              <>
                <tr className="odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-300">
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.campName}
                  </th>
                  <td className="px-6 py-4">{item.fees}</td>
                  <td className="px-6 py-4">{item.dateTime}</td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4">{item.healthcareProfessional}</td>
                  <td className=" px-6 py-4">
                    <button
                      onClick={() => openModal(item)}
                      className="btn btn-ghost btn-xl"
                    >
                      <RxUpdate className="text-red-600" />
                    </button>
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
                                Update {selectedCamp.campName}
                              </h3>
                              <hr className="my-4 border-t border-gray-900" />
                              <form
                                onSubmit={handleSubmit}
                                className="mt-4 space-y-4"
                              >
                                <input
                                  type="text"
                                  name="campName"
                                  placeholder="camp Name"
                                  defaultValue={selectedCamp.campName}
                                  className="input input-bordered w-full"
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
                                  name="dateTime"
                                  placeholder="dateTime"
                                  defaultValue={selectedCamp.dateTime}
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
                                  defaultValue={
                                    selectedCamp.healthcareProfessional
                                  }
                                  className="input input-bordered w-full"
                                />
                                <div className="modal-action">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Submit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={closeModal}
                                    className="btn"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className=" px-6 py-4">
                    <button
                      onClick={() => deleteCamp(item)}
                      className="btn btn-ghost btn-xl"
                    >
                      <FaTrashAlt className="text-red-600 "></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamp;

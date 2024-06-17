import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageRegCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: joinCamp = [] } = useQuery({
    queryKey: ["joinCamp"],
    queryFn: async () => {
      const res = await axiosSecure.get("/joinCamp");
      return res.data;
    },
  });

  const handleDeleteCamp = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/joinCamp/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `Camp registration has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-4xl text-center font-semibold">
          Manage Registered Camps
        </h2>
        <h2 className="text-4xl text-center font-semibold">
          Total Users : {joinCamp.length}
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
                Participant Name
              </th>
              <th scope="col" className="px-6 py-3">
                Camp Name
              </th>
              <th scope="col" className="px-6 py-3">
                Camp Fees
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Confirmation Status
              </th>
              <th scope="col" className="px-6 py-3">
                Cancel
              </th>
            </tr>
          </thead>
          <tbody>
            {joinCamp.map((item, index) => (
              <tr
                key={item._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.participantName}
                </th>
                <td className="px-6 py-4">{item.campName}</td>
                <td className="px-6 py-4">{item.campfees}</td>
                <td className="px-6 py-4">{item.paymentStatus}</td>
                <td className="px-6 py-4">{item.confirmationStatus}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteCamp(item._id)}
                    className="btn btn-ghost btn-xl"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRegCamps;

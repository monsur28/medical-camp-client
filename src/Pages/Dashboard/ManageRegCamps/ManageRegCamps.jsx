import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageRegCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed

  const { refetch, data: joinCamp = [] } = useQuery({
    queryKey: ["joinCamp"],
    queryFn: async () => {
      const res = await axiosSecure.get("/joinCamp");
      return res.data;
    },
  });

  const { data: payments = [], refetch: fetchPayments } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
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

  const handleConfirmPayment = async (id) => {
    try {
      const res = await axiosSecure.patch(`/payments/${id}`);
      if (res.data.modifiedCount > 0) {
        fetchPayments();
        Swal.fire({
          title: "Confirmed!",
          text: "Payment status has been updated to confirmed.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue confirming the payment.",
        icon: "error",
      });
    }
  };

  // Filter joinCamp based on searchQuery
  const filteredJoinCamp = joinCamp.filter(
    (camp) =>
      camp.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.campName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJoinCamp.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle pagination navigation
  const setPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-semibold">Manage Reg. Camps</h2>
        <h2 className="text-4xl font-semibold">
          Total Reg. Camps : {filteredJoinCamp.length}
        </h2>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by participant name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              const payment = payments.find(
                (payment) => payment.campId === item._id
              );
              const isPaid = payment ? true : false;
              const status = payment ? payment.status : "Unconfirmed";

              // Calculate the correct index for display
              const displayIndex = indexOfFirstItem + index + 1;

              return (
                <tr
                  key={item._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{displayIndex}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.participantName}
                  </th>
                  <td className="px-6 py-4">{item.campName}</td>
                  <td className="px-6 py-4">{item.campfees}</td>
                  <td className="px-6 py-4">{isPaid ? "Paid" : "Unpaid"}</td>
                  <td className="px-6 py-4">
                    {status}
                    {isPaid && status === "pending" && (
                      <button
                        onClick={() => handleConfirmPayment(payment._id)}
                        className="btn mt-2 btn-sm btn-success"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteCamp(item._id)}
                      className="btn btn-ghost btn-xl"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        {Array.from(
          Array(Math.ceil(filteredJoinCamp.length / itemsPerPage)),
          (item, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : "btn-secondary"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ManageRegCamps;

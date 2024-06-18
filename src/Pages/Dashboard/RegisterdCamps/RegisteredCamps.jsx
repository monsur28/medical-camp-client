import useRegCamp from "../../../Hooks/useRegCamp";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Dashboard/Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const RegisteredCamps = () => {
  const [joinCamp, refetch] = useRegCamp();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const totalFees = joinCamp.reduce((total, item) => {
    const campFee = parseInt(item.campfees.replace("$", ""));
    if (isNaN(campFee)) {
      console.warn(`Invalid camp fee for item:`, item);
      return total;
    }
    return total + campFee;
  }, 0);

  const handleDelete = () => {
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
        axiosSecure
          .delete(`/campData/${user?.email}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your Camp Registration has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong!",
              icon: "error",
            });
            console.error("Deletion error:", error);
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl text-center font-semibold">
        My Registered Camps
      </h2>
      <hr className="my-4 border-t border-gray-900" />
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Registered Camps: {joinCamp.length}</h2>
        <h2 className="text-4xl">Total Price: ${totalFees}</h2>
        {joinCamp.length ? (
          <div>
            <button
              className="btn btn-success"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Pay
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h2 className="text-4xl text-center font-semibold">
                  Payment : ${totalFees}
                </h2>
                <hr className="my-4 border-t border-gray-900" />
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Camp name
              </th>
              <th scope="col" className="px-6 py-3">
                Camp Fees
              </th>
              <th scope="col" className="px-6 py-3">
                Participant Name
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Confirmation Status
              </th>
              <th scope="col" className="px-6 py-3">
                Cancellation
              </th>
              <th scope="col" className="px-6 py-3">
                Feedback and Ratings
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
                  {item.campName}
                </th>
                <td className="px-6 py-4">{item.campfees}</td>
                <td className="px-6 py-4">{item.participantName}</td>
                <td className="px-6 py-4">{item.paymentStatus}</td>
                <td className="px-6 py-4">{item.confirmationStatus}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamps;

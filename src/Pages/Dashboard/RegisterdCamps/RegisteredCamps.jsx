import { useState } from "react";
import useRegCamp from "../../../Hooks/useRegCamp";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Dashboard/Payment/CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const RegisteredCamps = () => {
  const [joinCamp, refetch] = useRegCamp();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [selectedFeedbackCamp, setSelectedFeedbackCamp] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [feedbackSubmittedCamps, setFeedbackSubmittedCamps] = useState([]);

  const totalFees = joinCamp.reduce((total, item) => {
    const campFee = parseInt(item.campfees.replace("$", ""));
    if (isNaN(campFee)) {
      console.warn(`Invalid camp fee for item:`, item);
      return total;
    }
    return total + campFee;
  }, 0);

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
    // Ensure query does not run if user is not defined
    enabled: !!user?.email,
  });

  const openModal = (camp) => {
    setSelectedCamp(camp);
  };

  const openFeedbackModal = (camp) => {
    if (feedbackSubmittedCamps.includes(camp._id)) {
      Swal.fire({
        title: "Feedback already submitted!",
        text: "You have already submitted feedback for this camp.",
        icon: "info",
      });
    } else {
      setSelectedFeedbackCamp(camp);
    }
  };

  const closeModal = () => {
    setSelectedCamp(null);
    setSelectedFeedbackCamp(null);
  };

  const handleDelete = (campId) => {
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
          .delete(`/campData/${campId}`)
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

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const form = e.target;

    const campId = selectedFeedbackCamp._id;
    const transactionId = selectedFeedbackCamp.transactionId;

    const name = form.name.value;
    const email = form.email.value;
    const feedback = form.feedback.value;

    const photoURL = form
      .querySelector('img[name="photoURL"]')
      .getAttribute("src");

    const feedbackData = {
      name,
      transactionId,
      campId,
      email,
      photoURL,
      feedback,
    };

    axiosPublic
      .post("/feedback", feedbackData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "Your feedback is Valuable To Us",
            icon: "success",
          });
          // Update feedbackSubmittedCamps state
          setFeedbackSubmittedCamps([...feedbackSubmittedCamps, campId]);
        }
        closeModal();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "You Already Feedback this Camp",
          icon: "error",
        });
        console.error("Feedback submission error:", error);
      });
  };

  return (
    <div>
      <Helmet>
        <title>MedCamp | My Registered Camps</title>
      </Helmet>
      <h2 className="text-4xl text-center font-semibold">
        My Registered Camps
      </h2>
      <hr className="my-4 border-t border-gray-900" />
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Registered Camps: {joinCamp.length}</h2>
        <h2 className="text-4xl">Total Price: ${totalFees}</h2>
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
                Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Confirmation Status
              </th>
              <th scope="col" className="px-6 py-3">
                Pay
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
            {joinCamp.map((item, index) => {
              const isPaid = payments.find(
                (payment) => payment.campId === item._id
              );
              const status = isPaid ? isPaid.status : "Incomplete";

              return (
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
                  <td className="px-6 py-4">{isPaid ? "Paid" : "Unpaid"}</td>
                  <td className="px-6 py-4">{status}</td>
                  <td className="px-6 py-4">
                    {isPaid ? (
                      <button disabled className="btn btn-primary">
                        Pay
                      </button>
                    ) : (
                      <button
                        onClick={() => openModal(item)}
                        className="btn btn-info btn-xl"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-outline"
                      disabled={isPaid}
                    >
                      <FaTrashAlt className="text-red-600" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openFeedbackModal(item)}
                      className="btn btn-outline"
                      disabled={
                        !isPaid || feedbackSubmittedCamps.includes(item._id)
                      }
                    >
                      Feedback
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedCamp && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-1 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal modal-open">
              <div className="max-w-2xl modal-box">
                <h2 className="text-4xl text-center font-semibold">
                  Payment: {selectedCamp.campfees}
                </h2>
                <hr className="my-4 border-t border-gray-900" />
                <Elements stripe={stripePromise}>
                  <CheckoutForm camp={selectedCamp} />
                </Elements>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn" onClick={closeModal}>
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedFeedbackCamp && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-1 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal modal-open">
              <div className="max-w-2xl modal-box">
                <h2 className="text-4xl text-center font-semibold">
                  Feedback for {selectedFeedbackCamp.campName}
                </h2>
                <hr className="my-4 border-t border-gray-900" />
                <form onSubmit={handleSubmitFeedback}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="name"
                      value={user?.displayName}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="email"
                      value={user?.email}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Profile Picture
                    </label>
                    <img
                      className="rounded-full h-20 w-20"
                      src={user?.photoURL}
                      alt="Profile"
                      name="photoURL"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Feedback
                    </label>
                    <textarea
                      name="feedback"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div className="modal-action">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <button type="button" className="btn" onClick={closeModal}>
                      Close
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

export default RegisteredCamps;

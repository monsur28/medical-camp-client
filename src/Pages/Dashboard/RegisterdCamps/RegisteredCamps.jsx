import { Link } from "react-router-dom";
import useRegCamp from "../../../Hooks/useRegCamp";

const RegisteredCamps = () => {
  const [joinCamp] = useRegCamp();
  console.log(joinCamp);
  const totalfees = joinCamp.reduce((total, item) => total + item.fees, 0);

  return (
    <div>
      <h2 className="text-4xl text-center font-semibold">
        My Registered Camps
      </h2>
      <hr className="my-4 border-t border-gray-900" />
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Registered Camps: {joinCamp.length}</h2>
        <h2 className="text-4xl">Total Price: {totalfees}</h2>
        {joinCamp.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamps;

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  const totalPrice = payments.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-3xl">Total Payments: {payments.length}</h2>
        <h2 className="text-3xl">Total Fees : ${totalPrice}</h2>
      </div>
      <hr className="my-4 border-t border-gray-900" />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Camp Name</th>
              <th>price</th>
              <th>Transaction Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <th>{payment.campName}</th>
                <td>${payment.price}</td>
                <td>{payment.transactionId}</td>
                <td> {payments.transactionId ? "UnPaid" : "Paid"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

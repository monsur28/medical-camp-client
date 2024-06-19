import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const AnalyticsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState({
    totalPayments: 0,
    campCounts: [],
    payments: [],
  });

  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!paymentsLoading) {
      const totalPayments = payments.reduce(
        (acc, payment) => acc + payment.price,
        0
      );

      const campCounts = {};
      payments.forEach((payment) => {
        const { campId, campName, date, price, _id } = payment;

        if (campId) {
          if (campCounts[campId]) {
            campCounts[campId].count++;
          } else {
            campCounts[campId] = { count: 1, name: campName };
          }
        }

        const paymentData = {
          id: _id,
          date: new Date(date).toLocaleDateString(),
          amount: price,
          campIds: campId || "",
          campNames: campName || "Unknown Camp",
        };

        setAnalyticsData((prevData) => ({
          ...prevData,
          payments: [...prevData.payments, paymentData],
        }));
      });

      const campCountsChartData = Object.keys(campCounts).map((campId) => ({
        campName: campCounts[campId].name,
        count: campCounts[campId].count,
      }));

      setAnalyticsData((prevData) => ({
        ...prevData,
        campCounts: campCountsChartData,
        totalPayments: totalPayments,
      }));
    }
  }, [paymentsLoading, payments]);

  if (paymentsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h2 className="text-4xl">
          <span>Hi, Welcome </span>
          {user?.displayName ? user.displayName : "Back"}
        </h2>
      </div>
      <hr className="my-4 border-t border-gray-900" />
      <h1 className="text-3xl font-semibold mb-4">Analytics Page</h1>

      {/* Display analytics data */}
      {analyticsData && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="font-semibold">
              Total Payments Made: ${analyticsData.totalPayments.toFixed(2)}
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Payment Trends</h2>
              {/* Line chart for payment trends */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={analyticsData.payments}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    activeDot={{ r: 10 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Camp Participation : {analyticsData.campCounts.length}
            </h2>
            {/* Bar chart for camp participation */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={analyticsData.campCounts}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="campName" />
                <YAxis />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Display raw data tables if needed */}
      <div className="mt-8">
        {/* Display payment data table */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Payment Data</h3>
          {payments.length > 0 ? (
            <DataTable data={payments} />
          ) : (
            <p>No payment data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

// Example DataTable component to display payment data
const DataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table overflow-x-auto divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Payment ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Camp Names
            </th>
          </tr>
        </thead>
        <tbody className="bg-white  divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {data.map((payment, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payment._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${payment.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payment.campName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

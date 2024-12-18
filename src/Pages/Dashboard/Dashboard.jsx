import {
  FaHome,
  FaList,
  FaRegRegistered,
  FaRegistered,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineManageAccounts, MdOutlinePayment } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ImProfile } from "react-icons/im";
import { IoMdAnalytics } from "react-icons/io";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const organizerNavLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/organizerProfile"
          className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
        >
          <FaHome className="mr-3" />
          Organizer Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/add-a-camp"
          className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
        >
          <MdOutlineManageAccounts className="mr-3" />
          Add A Camp
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manageCamps"
          className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
        >
          <FaList className="mr-3" />
          Manage Camps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manageRegCamps"
          className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
        >
          <FaRegistered className="mr-3" />
          Manage Registered Camps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/allUsers"
          className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
        >
          <FaUsers className="mr-3" />
          All Users
        </NavLink>
      </li>
    </>
  );

  const participantNavLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/analytics"
          className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
        >
          <IoMdAnalytics className="mr-3" />
          Analytics
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/participant-profile"
          className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
        >
          <ImProfile className="mr-3" />
          Participant Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/registeredCamps"
          className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
        >
          <FaRegRegistered className="mr-3" />
          Registered Camps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/paymentHistory"
          className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
        >
          <MdOutlinePayment className="mr-3" />
          Payment History
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <Helmet>
        <title>MedCamp | Dashboard</title>
      </Helmet>
      <div className="flex max-h-fit">
        <div className=" max-h-fit bg-gradient-to-b from-blue-200 to-blue-400 text-gray-800 p-5">
          <div className="mb-10">
            <div className="text-2xl font-bold mb-2">Dashboard</div>
          </div>
          <ul className="space-y-2 mt-7">
            {isAdmin ? <>{organizerNavLinks}</> : <>{participantNavLinks}</>}
            <hr className="my-4 border-t border-gray-900" />
            <li>
              <NavLink
                to="/"
                className="flex items-center py-2 px-3 rounded hover:bg-blue-300 transition-colors duration-200"
              >
                <FaHome className="mr-3" /> Home
              </NavLink>
            </li>
            {/* ... other shared links */}
          </ul>
        </div>
        <div className="flex-1 p-10 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

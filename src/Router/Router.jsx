import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AvailableMedCamp from "../Pages/AvailableMedCamp/AvailableMedCamp";
import PrivateRoute from "../Router/PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import RegisteredCamps from "../Pages/Dashboard/RegisterdCamps/RegisteredCamps";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddCampPage from "../Pages/Dashboard/AddACamp.jsx/AddACamp";
import ManageCamp from "../Pages/Home/ManageCamp/ManageCamp";
import ManageRegCamps from "../Pages/Dashboard/ManageRegCamps/ManageRegCamps";
import UserProfile from "../Pages/Dashboard/UserProfile.jsx/UserProfile";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserAnalytics from "../Pages/Dashboard/UserAnalytics/UserAnalytics";
import Contact from "../Pages/Dashboard/Contact/Contact";
import OrganizerProfile from "../Pages/Dashboard/OrganizerProfile/OrganizerProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/availableCamps",
        element: <AvailableMedCamp></AvailableMedCamp>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
    ],
  },
  // Dashboard Route
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "registeredCamps",
        element: (
          <PrivateRoute>
            <RegisteredCamps></RegisteredCamps>
          </PrivateRoute>
        ),
      },
      {
        path: "participant-profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <PrivateRoute>
            <UserAnalytics></UserAnalytics>
          </PrivateRoute>
        ),
      },

      // Admin Routes
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "add-a-camp",
        element: (
          <AdminRoute>
            <AddCampPage></AddCampPage>
          </AdminRoute>
        ),
      },
      {
        path: "manageCamps",
        element: (
          <AdminRoute>
            <ManageCamp></ManageCamp>
          </AdminRoute>
        ),
      },
      {
        path: "manageRegCamps",
        element: (
          <AdminRoute>
            <ManageRegCamps></ManageRegCamps>
          </AdminRoute>
        ),
      },
      {
        path: "organizerProfile",
        element: (
          <AdminRoute>
            <OrganizerProfile></OrganizerProfile>
          </AdminRoute>
        ),
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AvailableMedCamp from "../Pages/AvailableMedCamp/AvailableMedCamp";
import PrivateRoute from "../Router/PrivateRoute";
import CampDetails from "../Pages/CampDetails/CampDetails";
import Dashboard from "../Pages/Dashboard/Dashboard";
import RegisteredCamps from "../Pages/Dashboard/RegisterdCamps/RegisteredCamps";

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
        path: "/campdetails/:id",
        element: (
          <PrivateRoute>
            <CampDetails></CampDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/camps/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "registeredCamps",
        element: <RegisteredCamps></RegisteredCamps>,
      },
    ],
  },
]);

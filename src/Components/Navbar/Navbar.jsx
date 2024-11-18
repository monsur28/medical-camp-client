import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import logo from "../../assets/medcamp_logo_round.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu state

  const handleLogOut = () => {
    logOut()
      .then(() => {
        MySwal.fire({
          title: "Success!",
          text: "You have logged out successfully.",
          icon: "success",
        });
        navigate("/login");
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Error!",
          text: error.message,
        });
      });
  };

  const navlinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="transition-all duration-300 hover:text-blue-500 px-4 py-2"
          onClick={() => setMenuOpen(false)} // Close menu on navigation
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/availableCamps"
          className="transition-all duration-300 hover:text-blue-500 px-4 py-2"
          onClick={() => setMenuOpen(false)}
        >
          Camps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className="transition-all duration-300 hover:text-blue-500 px-4 py-2"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="MedCamp Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-blue-600">MedCamp</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium text-lg">
          {navlinks}
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hidden lg:block"
              >
                <div className="w-12 h-12 rounded-full ring-2 ring-blue-500 ">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition-all">
                Join Us
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            className="text-gray-700 hover:text-blue-500 transition-all"
            onClick={() => setMenuOpen(!menuOpen)} // Toggle menu
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white shadow-lg p-4 transition-all duration-300 ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-4 text-gray-700 text-lg">
          {navlinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

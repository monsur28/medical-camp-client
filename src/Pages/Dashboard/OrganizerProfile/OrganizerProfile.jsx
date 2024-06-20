import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const OrganizerProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const fetchUserProfile = async ({ queryKey }) => {
    const [, email] = queryKey;
    const response = await axiosPublic.get("/userProfile", {
      params: { email },
    });
    return response.data;
  };

  const { refetch } = useQuery({
    queryKey: ["userProfile", user.email],
    queryFn: fetchUserProfile,
    initialData: user,
  });

  // State to manage form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);

  // State to manage form input values
  const [formValues, setFormValues] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, email, photoURL } = formValues;

    console.log("Updating profile with:", { name, email, photoURL });

    try {
      await updateUserProfile(name, email, photoURL).then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Your Profile Updated Successfully",
          icon: "success",
        });
        refetch();
        navigate("/dashboard/participant-profile");
      });
      const userInfo = { name, email };

      const res = await axiosPublic.patch("/updateProfile", userInfo, {
        params: { email: user.email },
      });

      if (res.data.result.modifiedCount > 0) {
        Swal.fire({
          title: "Good job!",
          text: "Your Profile Updated Successfully",
          icon: "success",
        });
        await refetch();
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response?.data?.message || error.message}`,
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 border border-solid border-black rounded-lg sm:flex sm:space-x-6 bg-gray-400 dark:text-gray-800">
        {/* User Profile Section */}
        <div className="flex-shrink-0 w-full mb-6 max-h-fit sm:h-36 sm:w-32 sm:mb-0">
          <img
            src={user?.photoURL}
            alt=""
            className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
          </div>
          <div className="space-y-1">
            {/* Email and Update Button Section */}
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                ></path>
              </svg>
              <span className="dark:text-gray-600">{user?.email}</span>
            </span>
            <button
              className="btn"
              onClick={() => setIsFormVisible((prev) => !prev)}
            >
              {isFormVisible ? "Close Update" : "Update Profile"}
            </button>

            {/* Update Form Section */}
            {isFormVisible && (
              <div className="mt-4">
                <form onSubmit={handleUpdate}>
                  <label htmlFor="Name" className="block dark:text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    id="name"
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-md border border-black dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  />
                  <label
                    htmlFor="Email"
                    className="block dark:text-gray-600 mt-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    id="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-md border border-black dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  />
                  <label
                    htmlFor="PhotoUrl"
                    className="block dark:text-gray-600 mt-2"
                  >
                    Photo Url
                  </label>
                  <input
                    type="text"
                    name="photoURL"
                    value={formValues.photoURL}
                    onChange={handleInputChange}
                    id="photoUrl"
                    placeholder="Photo Url"
                    className="w-full px-4 py-3 rounded-md border border-black dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  />
                  <div className="flex justify-center mt-4">
                    <button className="btn btn-accent">Update</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;

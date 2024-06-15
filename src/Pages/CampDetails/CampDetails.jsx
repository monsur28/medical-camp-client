import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const CampDetails = () => {
  const data = useLoaderData();
  const { user } = useAuth();
  const {
    image,
    campName,
    description,
    fees,
    location,
    healthcareProfessional,
  } = data;
  return (
    <div>
      <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
        <form
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstname" className="text-sm">
                  Camp Name
                </label>
                <input
                  id="campName"
                  type="text"
                  defaultValue={campName}
                  name="campName"
                  placeholder="Camp name"
                  readOnly
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  image
                </label>
                <input
                  id="image"
                  type="text"
                  name="image"
                  defaultValue={image}
                  readOnly
                  placeholder="Last name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Description
                </label>
                <input
                  id="description"
                  type="description"
                  name="description"
                  defaultValue={description}
                  readOnly
                  placeholder="description"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Fees
                </label>
                <input
                  id="fess"
                  type="text"
                  name="fees"
                  defaultValue={fees}
                  readOnly
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  location
                </label>
                <input
                  id="location"
                  type="text"
                  defaultValue={location}
                  readOnly
                  placeholder="location"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  HealthCare Doctor
                </label>
                <input
                  id="Doctor"
                  type="text"
                  name="doctor"
                  defaultValue={healthcareProfessional}
                  readOnly
                  placeholder="Doctor"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  Phone Number
                </label>
                <input
                  id="Phone Number"
                  type="number"
                  name="number"
                  placeholder="Phone Number"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="username" className="text-sm">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  defaultValue={user.displayName}
                  placeholder="Username"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="username" className="text-sm">
                  email
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  placeholder="Username"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
            </div>
          </fieldset>
          <button className="btn block">Join the Camp</button>
        </form>
      </section>
    </div>
  );
};

export default CampDetails;

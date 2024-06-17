import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCampPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const campData = {
        campName: data.campName,
        fees: data.campfees,
        dateTime: data.dateTime,
        location: data.location,
        healthcareProfessional: data.healthcareProfessional,
        participantCount: data.participantCount,
        description: data.description,
        image: res.data.data.display_url,
      };
      const campRes = await axiosSecure.post("/camps", campData);
      if (campRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your CampData has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div className="  flex justify-center items-center bg-gray-100">
      <Helmet>
        <title>MedCamp | Add A Camp</title>
      </Helmet>
      <div className=" w-full p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl text-center font-semibold">Add a Camp</h1>
        <hr className="my-4 border-t border-gray-900" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="campName" className="block text-sm font-medium">
                Camp Name
              </label>
              <input
                type="text"
                id="campName"
                name="campName"
                className="w-full border rounded-md px-3 py-2"
                {...register("campName", { required: true })}
              />
              {errors.campName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="campFees" className="block text-sm font-medium">
                Camp Fees
              </label>
              <input
                type="text"
                id="campFees"
                name="campfees"
                className="w-full border rounded-md px-3 py-2"
                {...register("campfees", { required: true })}
              />
              {errors.campfees && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="scheduledDateTime"
                className="block text-sm font-medium"
              >
                Date and Time
              </label>
              <input
                type="datetime-local"
                id="dateTime"
                name="dateTime"
                className="w-full border rounded-md px-3 py-2"
                {...register("dateTime", { required: true })}
              />
              {errors.dateTime && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="venueLocation"
                className="block text-sm font-medium"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full border rounded-md px-3 py-2"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="healthcareProfessionals"
                className="block text-sm font-medium"
              >
                Healthcare Professionals Name
              </label>
              <input
                type="text"
                id="healthcareProfessionals"
                name="healthcareProfessional"
                className="w-full border rounded-md px-3 py-2"
                {...register("healthcareProfessional", { required: true })}
              />
              {errors.healthcareProfessional && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="participantCount"
                className="block text-sm font-medium"
              >
                Participant Count
              </label>
              <input
                type="text"
                id="participantCount"
                name="participantCount"
                className="w-full border rounded-md px-3 py-2"
                {...register("participantCount", { required: true })}
              />
              {errors.participantCount && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="2"
                className="w-full border rounded-md px-3 py-2"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span className="text-red-600">This field is required</span>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add A Camp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCampPage;

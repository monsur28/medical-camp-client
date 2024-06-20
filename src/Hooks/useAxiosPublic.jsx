import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b9a12-medical-camp-managment-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

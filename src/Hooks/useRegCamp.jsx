import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRegCamp = () => {
  const axiosSecure = useAxiosSecure();
  //   const { user } = useAuth();
  const { refetch, data: joinCamp = [] } = useQuery({
    queryKey: ["joinCamp"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/joinCamp`);
      return res.data;
    },
  });

  return [joinCamp, refetch];
};

export default useRegCamp;

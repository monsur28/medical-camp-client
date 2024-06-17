import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCamp = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: camps = [] } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/camps");
      return res.data;
    },
  });

  return [camps, refetch];
};

export default useCamp;

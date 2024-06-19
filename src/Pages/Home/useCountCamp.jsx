import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const useCountCamp = () => {
  const axiosSecure = useAxiosSecure();

  const { data: participantCounts = {}, refetch } = useQuery({
    queryKey: "campParticipantsCount",
    queryFn: async () => {
      const response = await axiosSecure.get("/campParticipantsCount");
      return response.data.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {});
    },
  });

  return [participantCounts, refetch];
};

export default useCountCamp;

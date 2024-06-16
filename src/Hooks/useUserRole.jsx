import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: userType,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [user?.email, "userType"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return ["Loading", isLoading];
  } else if (isError) {
    console.error("Error fetching user role");
    return ["Error", isLoading];
  } else if (userType && userType.role) {
    const { role } = userType;
    if (role === "Organizer") {
      return ["Organizer", isLoading];
    } else {
      return ["Participant", isLoading];
    }
  }

  return ["Participant", isLoading, userType];
};

export default useUserRole;

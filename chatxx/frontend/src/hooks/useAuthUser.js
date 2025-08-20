// import { useQuery } from "@tanstack/react-query";
// import { getAuthUser } from "../lib/api.js";

// const useAuthUser = () => {
//   const { data: authUser, isLoading, error } = useQuery({
//     queryKey: ['authUser'],
//     queryFn: getAuthUser,
//     retry: false,
//   });

//   return {isLoading:authUser.isLoading,user : authUser. data?.user};
// }

// export default useAuthUser

import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api.js";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    isLoading : authUser.isLoading,
    authUser:authUser.data?.user
  };
};

export default useAuthUser;

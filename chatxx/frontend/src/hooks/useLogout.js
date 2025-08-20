import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api';

export const useLogout = () => {
      const queryClient = useQueryClient();

  const { mutate: logoutMutation,isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully!");
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  return {logoutMutation ,isPending}

}

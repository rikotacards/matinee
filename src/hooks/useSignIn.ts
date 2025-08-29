import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { signInWithGoogle } from "../userActions/signInWithGoogle";

export const useSignIn = () => {
  return useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: () => {
     

      // You may also want to refetch the items if you're showing all items
    },
    onError: (error) => {
      enqueueSnackbar({ message: error.message, variant: "error" });
    },
  });
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
  } else {
    // optional: redirect the user after successful sign-out
    window.location.href = "/";
    console.log("Successfully signed out!");
  }
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { supabase } from "../supbaseClient";

export const useSignOut = () => {

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      enqueueSnackbar({
        message: "Successfully signed out",
        variant: "info",
      });
    
      // You may also want to refetch the items if you're showing all items
    },
    onError: (error) => {
      enqueueSnackbar({ message: error.message, variant: "error" });
    },
  });
};

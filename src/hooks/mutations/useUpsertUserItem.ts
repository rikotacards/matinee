import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { useSnackbar } from "notistack";

interface UserItemArgs {
  movie_ref_id?: number;
  status?: string;
  user_id: string;
}

/**
 * A custom React Query mutation hook to upsert a user item.
 * @returns A useMutation object with a mutate function for upserting data.
 */
export const useUpsertUserItem = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: async (userItem: UserItemArgs) => {
      const { data, error } = await supabase
        .from("user_item")
        .upsert(userItem, {
          onConflict: "movie_ref_id,user_id", // Specify the columns to check for conflicts
        })
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (_, data) => {
      // Invalidate the relevant cache after a successful upsert.
      // This ensures any queries that depend on this data are refetched.
      queryClient.invalidateQueries({ queryKey: ["user_item", data.user_id, data.movie_ref_id] });
      queryClient.invalidateQueries({ queryKey: ["movie_ref", {external_id: data.movie_ref_id}] });


    },
    onError: (e) => {
        enqueueSnackbar({message: 'Failed to add movie', variant:'error'})
    }
  });
};

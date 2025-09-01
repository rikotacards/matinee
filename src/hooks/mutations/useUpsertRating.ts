import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { useSnackbar } from "notistack";

interface IRatingArgs {
  id?: number | string;
  rating: number;
  user_id: string;
  review?: string;
  movie_ref_id: number | string
}
interface RatingReturn {
  rating: number;
  user_id: string;
  review?: string;
  movie_ref_id: number | string;
}

/**
 * A custom React Query mutation hook to upsert a user item.
 * @returns A useMutation object with a mutate function for upserting data.
 */
export const useUpsertRating = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (movieRef: IRatingArgs): Promise<RatingReturn[]> => {
      const { data, error } = await supabase
        .from("rating")
        .upsert(movieRef, {
          onConflict: "movie_ref_id, user_id", // Specify the columns to check for conflicts
        })
        .select();

      if (error) {
        throw new Error(error.message);
      }
      if (!data || data.length === 0) {
        throw new Error("Upsert operation failed to return an ID.");
      }
      return data;
    },
    onSuccess: () => {
            enqueueSnackbar({ message: 'Rating updated', variant: "success" });

      queryClient.invalidateQueries({ queryKey: ["rating"] });
    },
    onError: (e) => {
      enqueueSnackbar({ message: e.message, variant: "error" });
    },
  });
};

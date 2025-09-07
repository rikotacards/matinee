import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { useSnackbar } from "notistack";

interface MovieRefArg {
  external_id: number | string;
  poster_path: string;
  backdrop_path: string;
  title: string;
  source: string;
  release: string;
  overview: string;
}

/**
 * A custom React Query mutation hook to upsert a user item.
 * @returns A useMutation object with a mutate function for upserting data.
 */
export const useUpsertMovieRef = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (movieRef: MovieRefArg): Promise<number> => {
      const { data, error } = await supabase
        .from("movie_ref")
        .upsert(movieRef, {
          onConflict: "external_id", // Specify the columns to check for conflicts
        })
        .select("id");

      if (error) {
        throw new Error(error.message);
      }
      if (!data || data.length === 0) {
        throw new Error("Upsert operation failed to return an ID.");
      }
      return data[0].id;
    },
    onSuccess: (_, data) => {
      // Invalidate the relevant cache after a successful upsert.
      // This ensures any queries that depend on this data are refetched.
      queryClient.invalidateQueries({
        queryKey: ["useGetMovieRef"],
      });
    },
    onError: (e) => {
      enqueueSnackbar({ message: e.message, variant: "error" });
    },
  });
};

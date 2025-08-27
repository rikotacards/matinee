import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

/**
 * Custom hook to get a single item by its API ID and a user ID.
 * @param apiId The API ID of the movie.
 * @param userId The ID of the user.
 * @returns A UseQueryResult object with the data, loading, and error states.
 */
export interface Rating {
  id: string;
  created_at: string;
  user_id: string;
  rating: number;
  movie_ref_id: string;
  review?: string;
}
export const useGetRating = ({
  movie_ref_id,
  user_id,
}: {
  movie_ref_id: Rating["movie_ref_id"];
  user_id: Rating["user_id"];
}) => {
  const queryFn = async () => {
    if (!user_id || !movie_ref_id) {
      return null;
    }

    const { data, error } = await supabase
      .from("rating")
      .select("*") // Select all columns from the items table
      .eq("movie_ref_id", movie_ref_id)
      .eq("user_id", user_id) // Filter for rows where user_id matches
      .maybeSingle() // Use single() to get a single row directly, since you expect a unique result

    if (error) {
      throw new Error(error.message);
    }
    if(!data?.length){
        throw new Error("no rows!")
    }

    return data;
  };

  return useQuery<Rating | null>({
    queryKey: ["rating", movie_ref_id, user_id],
    queryFn,
    enabled: !!movie_ref_id || !!user_id,
  });
};

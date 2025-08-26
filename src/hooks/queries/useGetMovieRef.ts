import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

/**
 * A custom hook to fetch all items for a specific list, including item details.
 * @param listId The ID of the list to fetch items for.
 * @returns A UseQueryResult object with the data, loading, and error states.
 */
interface MovieRef {
    id: string;
    created_at: string;
    external_id: number;
    title: string;
    poster_path: string;
    source: string;
    release: string;
    backdrop_path: string;

}
export const useGetMovieRef = (id: string) => {
  const queryFn = async () => {
    if (!id) {
      return undefined
    }

    // Select from the junction table and join the 'items' table
    const { data, error } = await supabase
      .from("movie_ref")
      .select("*") // This is the key. 'items(*)' means select all columns from the related 'items' table.
      .eq("id", id).single()

    if (error) {
      throw new Error(error.message);
    }
    if (!data || data.length === 0) {
      return [];
    }

   return data
     
  };

  return useQuery<MovieRef, Error>({
    queryKey: ["items", id],
    queryFn,
    enabled: !!id,
  });
};
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

interface MovieRef {
  id: number | string;
  created_at: string;
  external_id: number;
  title: string;
  poster_path: string;
  source: string;
  release: string;
  backdrop_path: string;
  overview?: string;
}

export const useGetMovieRef = ( filters: Partial<MovieRef>) => {
  const queryFn = async () => {
    const {id} = filters
    // The query starts with a selection from the table.
    let query = supabase.from("movie_ref").select("*") .or(`id.eq.${id}, external_id.eq.${id}`);


 
  

    const { data, error } = await query.maybeSingle()

    if (error) {
      throw new Error(error.message);
    }


    // If no ID was provided, return an array of results.
    return data
  };

  const queryKey = ["useGetMovieRef", filters.id];

  return useQuery<MovieRef | null, Error>({
    queryKey,
    queryFn,
    enabled: !!filters,
  });
};
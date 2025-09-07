import { useMovieDetails } from "../../pages/movieProfile/useGetMovieDetails";
import { supabase } from "../../supbaseClient";
import type { UserItem } from "../queries/useGetUserItems";
import { useAuth } from "../useAuth";

// goal is to populate movie ref
// insert item
export const useCheckAndPopulateNew =  (
  movieId: string | number
) => {
  const internalMovie = useMovieDetails(movieId);
  const { user } = useAuth();
  return async (): Promise<UserItem | undefined> => {
    if (internalMovie?.id) {
      const { data: userItem, error } = await supabase
        .from("user_item")
        .select("*") // Select all columns from the items table
        .eq("user_id", user?.id)
        .eq("movie_ref_id", internalMovie.id) // Filter for rows where user_id matches
        .maybeSingle(); // Use single() to get a single row directly, since you expect a unique result
      if (error) {
        console.log(error);
        throw new Error("Error");
      }
      console.log("uu'", userItem)
      if (userItem) {
        // do nothing
        return userItem;
      } else {
        const { data, error } = await supabase
          .from("user_item")
          .upsert(
            {
              movie_ref_id: internalMovie.id,
              status: null,
              user_id: user?.id,
              rating: 0,
            },
            {
              onConflict: "movie_ref_id,user_id", // Specify the columns to check for conflicts
            }
          )
          .select()
          .single();
          console.log('making new',data)
        if (error) {
          console.error(error);
        } else {
          return data;
        }
      }
    } else {
      const { data: internalMovieId, error } = await supabase
        .from("movie_ref")
        .upsert(
          {
            external_id: internalMovie.id,
            poster_path: internalMovie.poster_path,
            backdrop_path: internalMovie.backdrop_path,
            title: internalMovie.title,
            release: internalMovie.release,
            source: "TMBD",
            overview: internalMovie.overview,
          },
          {
            onConflict: "external_id", // Specify the columns to check for conflicts
          }
        )
        .select("id");
      if (error) {
        throw new Error("Error on upserting movie ref");
      }
      const { data, error: upsertUserItemError } = await supabase
        .from("user_item")
        .upsert(
          {
            movie_ref_id: internalMovieId,
            status: null,
            user_id: user?.id,
            rating: 0,
          },
          {
            onConflict: "movie_ref_id,user_id", // Specify the columns to check for conflicts
          }
        )
        .select()
        .single();
      if (upsertUserItemError) {
        throw new Error("Error upsert user item");
      } else {
        return data;
      }
    }
  };
};

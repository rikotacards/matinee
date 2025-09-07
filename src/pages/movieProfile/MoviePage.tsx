import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useMovieDetails } from "./useGetMovieDetails";
import { useGetMovieRef } from "../../hooks/queries/useGetMovieRef";
import { useGetUserItemByMovieRef } from "../../hooks/queries/useGetUserItemByMovieRef";
import { useUpdateUserItem } from "../../hooks/mutations/useUpdateUserItem";
import { useUpsertMovieRef } from "../../hooks/mutations/useUpsertMovieRef";
import { useUpsertUserItem } from "../../hooks/mutations/useUpsertUserItem";
import { MovieProfileHeader } from "./MovieProfileHeader";
import { getImage } from "../../utils/getImage";
interface MoviePageProps {
  movieIdUrl: string;
}
export const MoviePage: React.FC<MoviePageProps> = ({ movieIdUrl }) => {
  const movieDetails = useMovieDetails(movieIdUrl);
        const fullPoster = getImage(movieDetails.poster_path || "");
  
  const internalMovieRef = useGetMovieRef({ id: movieIdUrl });
  const { user } = useAuth();
  const update = useUpdateUserItem();
  const upsertUserItem = useUpsertUserItem();
  const addMovieRef = useUpsertMovieRef();
  // here item is used to display status
  const item = useGetUserItemByMovieRef({
    movieRefId: internalMovieRef.data?.id,
    userId: user?.id,
  });
  console.log('have item?', item.data)
  if (item.isLoading) {
    return <CircularProgress />;
  }
  const onUpdateMovieStatus = async (status: string) => {
    if (!user?.id) {
      throw new Error("none");
    }
    if (!item) {
      throw new Error("no item");
    }
    let movieId = internalMovieRef.data?.id;
    console.log('on update, movieId', movieId)
    if (!movieId) {
        console.log('adding internal,', movieDetails)
      movieId = await addMovieRef.mutateAsync({
        external_id: movieDetails.id,
        poster_path: movieDetails.poster_path,
        backdrop_path: movieDetails.backdrop_path,
        title: movieDetails.title,
        source: "TMDB",
        release: movieDetails.release,
        overview: movieDetails.overview,
      });
      console.log('creating internal ref', movieId)
    }
    if (!item.data) {
      await upsertUserItem.mutateAsync({
        movie_ref_id: movieId,
        status,
        user_id: user.id,
        rating: 0,
      });
      console.log('creating new item')
    } else {
      await update.mutateAsync({
        updatePayload: { status },
        movieRefId: movieId,
        userId: user.id,
        itemId: item.data.id,
      });
      console.log('updating existing')
    }
  };
  return (
    <Box>
      {item.data?.id ? "yes" : "no"}
      <MovieProfileHeader
      poster_path={fullPoster}
      title={movieDetails.title || ""}
      release={movieDetails.release || ""}
      movieId={movieDetails.id || ""}
      />
      {movieDetails.overview}
      <Button
        onClick={() =>
          onUpdateMovieStatus(
            item.data?.status === "watched" ? "not watched" : "watched"
          )
        }
      >
        {item.data?.status === "watched" ? "watched" : "not watched"}
      </Button>
      <Button>Rate</Button>
      <Button>add to list</Button>
      <Button>add to watchlist</Button>
    </Box>
  );
};

import React from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useMovieDetails } from "./useGetMovieDetails";
import { useGetMovieRef } from "../../hooks/queries/useGetMovieRef";
import { useGetUserItemByMovieRef } from "../../hooks/queries/useGetUserItemByMovieRef";
import { useUpdateUserItem } from "../../hooks/mutations/useUpdateUserItem";
import { MovieProfileHeader } from "./MovieProfileHeader";
import { getImage } from "../../utils/getImage";
import { useGetCheckAndPopulate } from "../../hooks/mutations/useGetCheckAndPopulate";
import { Add, BookmarkBorder, StarOutline } from "@mui/icons-material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDialogControl } from "../../hooks/useDialogControl";
import { RatingInputForm } from "../../components/RatingInputForm";
import { RatingDisplay } from "../../components/RatingDisplay";
import { useAddToWatchlist } from "../../hooks/mutations/useAddToWatchlist";
import { useGetAddToWatchlist } from "../../hooks/mutations/useGetAddToWatchlist copy";
import { useUpsertWatchlistItem } from "../../hooks/mutations/useUpsertWatchlistItem";
interface MoviePageProps {
  movieIdUrl: string;
}
export const MoviePage: React.FC<MoviePageProps> = ({ movieIdUrl }) => {
  const movieDetails = useMovieDetails(movieIdUrl);
      const add = useUpsertWatchlistItem()
  
  const fullPoster = getImage(movieDetails.poster_path || "");
  const internalMovieRef = useGetMovieRef({ id: movieIdUrl });
  const addToWatchlist = useGetAddToWatchlist(internalMovieRef.data?.id || "");
  const { user } = useAuth();
  const update = useUpdateUserItem();
  // here item is used to display status
  const item = useGetUserItemByMovieRef({
    movieRefId: internalMovieRef.data?.id,
    userId: user?.id,
  });
  const checkAndPopulate = useGetCheckAndPopulate(movieIdUrl);
  const hasWatched = item.data?.status === "watched";
  const hasRating = !!item.data?.rating;
  const rateIcon = hasRating ? (
    <RatingDisplay rating={item.data?.rating} />
  ) : (
    <StarOutline />
  );
  const watchedIcon = hasWatched ? (
    <CheckCircleIcon />
  ) : (
    <RadioButtonUncheckedIcon />
  );
  const { name, setDialogName, onCloseDialog } = useDialogControl();
  if (item.isLoading) {
    return <CircularProgress />;
  }
  const onUpdateMovieStatus = async (status: string) => {
    const item = await checkAndPopulate();
    if (!user?.id) {
      throw new Error("no user");
    }
    await update.mutateAsync({
      updatePayload: { status },
      userId: user?.id,
      itemId: item?.id,
      movieRefId: item.movie_ref_id,
    });
  };
  const onAddToWatchlist = async () => {
    if(!user?.id){
        throw new Error('no user')
    }
    const item = await checkAndPopulate();
    await add.mutateAsync({
        item_id: item.id,
        movie_ref_id: item.movie_ref_id,
        user_id: user?.id
    })
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

      <Stack alignItems={"center"} direction="row">
        <Chip
          onClick={() =>
            onUpdateMovieStatus(hasWatched ? "not watched" : "watched")
          }
          icon={watchedIcon}
          label={
            <Typography variant="caption">
              {hasWatched ? "Watched" : "Not watched"}
            </Typography>
          }
        />
        <Chip
          onClick={() => setDialogName("rate")}
          icon={rateIcon}
          label={"Rate"}
        />
        <Chip icon={<Add />} label={"list"} />
        <IconButton onClick={onAddToWatchlist}>
          <BookmarkBorder />
        </IconButton>
      </Stack>
      <Dialog open={name === "rate"} onClose={onCloseDialog}>
        <RatingInputForm
          rating={item.data?.rating}
          movie_ref_id={item.data?.movie_ref_id || ""}
          onClose={onCloseDialog}
        />
      </Dialog>
    </Box>
  );
};

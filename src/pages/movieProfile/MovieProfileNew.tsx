import React from "react";
import { useParams } from "react-router";
import { useGetMovieDetailsSwitch } from "./useGetMovieDetailsSwitch";
import { MovieProfileHeader } from "./MovieProfileHeader";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Typography,
} from "@mui/material";
import { useGetUserItemByMovieRef } from "../../hooks/queries/useGetUserItemByMovieRef";
import { useAuth } from "../../hooks/useAuth";
import { useUpsertUserItem } from "../../hooks/mutations/useUpsertUserItem";
import { useUpsertMovieRef } from "../../hooks/mutations/useUpsertMovieRef";
import { getImage } from "../../utils/getImage";
import { useUpdateUserItem } from "../../hooks/mutations/useUpdateUserItem";
import { AllRatings } from "./AllRatings";
import { HaveYouWatched } from "./HaveYouWatched";
import { useGetRating } from "../../hooks/queries/useGetRating";
import { AddRating } from "./AddRating";
import { WatchedBy } from "./WatchedBy";
import { ActionChips } from "./ActionChips";
import { useDialogControl } from "../../hooks/useDialogControl";
import { RatingInputForm } from "../../components/RatingInputForm";
import { DialogWrapper } from "../../components/DialogWrapper";
import { AddToListPage } from "../AddToListPage";

export const MovieProfileNew: React.FC = () => {
  const params = useParams();
  const { user } = useAuth();
  const { movie_ref_id, is_internal } = params; // should be general ID.
  const externalId = Number(movie_ref_id); // might not be exteranl id
  const upsertMovieRef = useUpsertMovieRef();
  const { name, onCloseDialog, setDialogName } = useDialogControl();
  const onEditRating = () => {
    setDialogName("edit");
  };
  const { hasInternalRef, movieDetails } = useGetMovieDetailsSwitch(
    externalId,
    is_internal === "true"
  );
  const updateUserItem = useUpdateUserItem();
  const item = useGetUserItemByMovieRef({
    userId: user?.id,
    movieRefId: hasInternalRef ? movieDetails.id : undefined,
  });
  const myRating = useGetRating({
    movie_ref_id: movieDetails.id,
    user_id: user?.id,
  });
  const upsertUserItem = useUpsertUserItem();
  const fullPoster = getImage(movieDetails.poster_path);

  const onUpdate = async (status?: string) => {
    if (!user?.id) {
      throw new Error("user not logged in");
    }
    if (!hasInternalRef) {
      const movie_ref_id = await upsertMovieRef.mutateAsync({
        overview: movieDetails.overview,
        external_id: movieDetails.id,
        source: "TMDB",
        release: movieDetails.release,
        poster_path: movieDetails.poster_path,
        backdrop_path: movieDetails.backdrop_path,
        title: movieDetails.title,
      });
      if (!item.data) {
        upsertUserItem.mutateAsync({ movie_ref_id, user_id: user.id, status });
      }
      if (item.data) {
        updateUserItem.mutateAsync({
          updatePayload: { status },
          itemId: item.data.id,
        });
      }
    }
    if (hasInternalRef) {
      if (!item.data) {
        upsertUserItem.mutateAsync({
          movie_ref_id: movieDetails.id,
          user_id: user.id,
          status,
        });
      }
      if (item.data) {
        updateUserItem.mutateAsync({
          updatePayload: { status },
          itemId: item.data.id,
        });
      }
    }
  };
  if (!externalId) {
    return <Typography>Invalid</Typography>;
  }
  if (item.isLoading) {
    return <CircularProgress />;
  }
  const hasWatched = item.data?.status === "watched";
  return (
    <Box sx={{ maxWidth: 500 }}>
      <MovieProfileHeader
        poster_path={fullPoster}
        release={movieDetails.release}
        title={movieDetails.title}
        item={item.data}
        onUpdate={onUpdate}
        movieId={movieDetails.id}
        userId={user?.id}
        overview={movieDetails.overview}
      />

      <ActionChips
        onOpenDialog={(name: string) => setDialogName(name)}
        myRating={myRating.data?.rating}
        onUpdate={onUpdate}
        hasWatched={hasWatched}
      />

      <Typography sx={{ mt: 1 }} variant="body2">
        {movieDetails.overview}
      </Typography>

      {hasWatched && item.data && !myRating.data && (
        <AddRating movie_ref_id={movieDetails.id} />
      )}
      <Box sx={{ mt: 2 }}>
        <WatchedBy hasWatched={hasWatched} />
        {!item.data && <HaveYouWatched onUpdate={onUpdate} />}

        <AllRatings ratedBy={undefined} movie_ref_id_url={movieDetails.id} />
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Dialog onClose={onCloseDialog} open={name === "edit"}>
        <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <RatingInputForm
            onClose={onCloseDialog}
            movie_ref_id={movieDetails.id}
            rating={myRating.data?.rating}
          />
          <Button onClick={onCloseDialog}>Cancel</Button>
        </Box>
      </Dialog>
      <DialogWrapper
        title={"add"}
        open={name === "addToList"}
        onClose={onCloseDialog}
      >
        <AddToListPage onClose={onCloseDialog} itemId={""} />
      </DialogWrapper>
    </Box>
  );
};

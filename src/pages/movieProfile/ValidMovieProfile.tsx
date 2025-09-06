import React from "react";
import { useDialogControl } from "../../hooks/useDialogControl";
import { useCheckAndPopulateUserItem } from "../../hooks/mutations/useCheckAndPopulate";
import { useGetMovieDetailsSwitch } from "./useGetMovieDetailsSwitch";
import { useUpdateUserItem } from "../../hooks/mutations/useUpdateUserItem";
import { useGetUserItemByMovieRef } from "../../hooks/queries/useGetUserItemByMovieRef";
import { useAuth } from "../../hooks/useAuth";
import { getImage } from "../../utils/getImage";
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { MovieProfileHeader } from "./MovieProfileHeader";
import { ActionChips } from "./ActionChips";
import { AddRating } from "./AddRating";
import { WatchedBy } from "./WatchedBy";
import { AllRatings } from "./AllRatings";
import { RatingInputForm } from "../../components/RatingInputForm";
import { DialogWrapper } from "../../components/DialogWrapper";
import { AddToListPage } from "../AddToListPage";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { MovieProfileSkeleton } from "./MovieProfileSkeleton";
interface ValidMovieProfileProps {
  movie_ref_id: string;
  is_internal: string;
}
export const ValidMovieProfile: React.FC<ValidMovieProfileProps> = ({
  movie_ref_id,
  is_internal,
}) => {
  const isInternal = is_internal === "true";
  const { user } = useAuth();
  const nav = useNavigate();
  const onBack = () => nav(-1);
  const { name, onCloseDialog, setDialogName } = useDialogControl();
  const checkAndPopulate = useCheckAndPopulateUserItem(
    movie_ref_id,
    isInternal
  );
  const { hasInternalRef, movieDetails , isLoading} = useGetMovieDetailsSwitch(
    movie_ref_id,
    isInternal
  );
  const updateUserItem = useUpdateUserItem();
  const item = useGetUserItemByMovieRef({
    userId: user?.id,
    movieRefId: hasInternalRef ? movieDetails.id : undefined,
  });
 
  const fullPoster = getImage(movieDetails.poster_path);

  const onUpdateNew = async (status: string) => {
    const item = await checkAndPopulate();

    if (!item) {
      throw new Error("no item");
    }
    if (!user?.id) {
      throw new Error("user not logged in");
    }
    updateUserItem.mutate({
      userId: user?.id,
      movieRefId: movieDetails.id,
      updatePayload: { status },
      itemId: item?.id,
    });
  };

  if (item.isLoading || isLoading) {
    return <MovieProfileSkeleton />;
  }
  const hasWatched = item.data?.status === "watched";
 
  return (
    <Box sx={{ maxWidth: 500 }}>
      <IconButton onClick={onBack}>
        <ChevronLeft />
      </IconButton>
      {/* {!item.data && <HaveYouWatched onUpdate={onUpdate} />} */}
      <MovieProfileHeader
        poster_path={fullPoster}
        release={movieDetails.release_date}
        title={movieDetails.title}
        movieId={movieDetails.id}
      />

      <ActionChips
        onOpenDialog={(name: string) => setDialogName(name)}
        myRating={item.data?.rating || 0}
        onUpdate={onUpdateNew}
        hasWatched={hasWatched}
        movieId={item.data?.movie_ref_id || ""}
        isInternal={isInternal}
      />
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography sx={{ mt: 1 }} variant="body2">
        {movieDetails.overview}
      </Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />

      {hasWatched && !item.data?.rating && (
        <AddRating isInternal={isInternal} movie_ref_id={movieDetails.id} />
      )}
      <Box sx={{ mt: 2 }}>
        <WatchedBy hasWatched={hasWatched} />

        <AllRatings
          isInternal={isInternal}
          ratedBy={undefined}
          movie_ref_id_url={movieDetails.id}
        />
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Dialog onClose={onCloseDialog} open={name === "edit"}>
        <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <RatingInputForm
            onClose={onCloseDialog}
            movie_ref_id={movieDetails.id}
            isInternal={is_internal === "true"}
            rating={item.data?.rating || 0}
          />
          <Button onClick={onCloseDialog}>Cancel</Button>
        </Box>
      </Dialog>
      <DialogWrapper
        title={"Add to list"}
        open={name === "addToList"}
        onClose={onCloseDialog}
      >
        <AddToListPage
          onClose={onCloseDialog}
          isInternal={isInternal}
          movieId={movieDetails.id}
        />
      </DialogWrapper>
    </Box>
  );
};

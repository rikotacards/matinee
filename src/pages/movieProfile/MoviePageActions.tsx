import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import type { UserItem } from "../../hooks/queries/useGetUserItems";
import { RatingDisplay } from "../../components/RatingDisplay";
import { BookmarkBorder, Star, StarOutline } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useAuth } from "../../hooks/useAuth";
import { useUpdateUserItem } from "../../hooks/mutations/useUpdateUserItem";
import { useGetCheckAndPopulate } from "../../hooks/mutations/useGetCheckAndPopulate";
import { useDialogControl } from "../../hooks/useDialogControl";
import { RatingInputForm } from "../../components/RatingInputForm";
import { AddToListPage } from "../AddToListPage";
import { useAddItemToList } from "../../hooks/mutations/useAddItemToList";
import { useUpsertWatchlistItem } from "../../hooks/mutations/useUpsertWatchlistItem";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useGetWatchlistItemByMovieRefId } from "../../hooks/queries/useGetWatchlistItemByItemId";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useDeleteWatchlistItem } from "../../hooks/mutations/useDeleteWatchlistItem";
interface MoviePageActionsProps {
  userItem?: UserItem;
  isLoading: boolean;
  movieIdUrl: string;
}
export const MoviePageActions: React.FC<MoviePageActionsProps> = ({
  userItem,
  movieIdUrl,
}) => {
  const { user } = useAuth();
  const hasWatched = userItem?.status === "watched";
  const hasRating = !!userItem?.rating;
  const update = useUpdateUserItem();
  const addItemToList = useAddItemToList();
  const add = useUpsertWatchlistItem();
  const removeFromWatchlist = useDeleteWatchlistItem();
  const watchlistItem = useGetWatchlistItemByMovieRefId({
    userId: user?.id,
    movie_ref_id: userItem?.movie_ref_id,
  });
  const checkAndPopulate = useGetCheckAndPopulate(movieIdUrl);
  const { name, setDialogName, onCloseDialog } = useDialogControl();
  const rateIcon = hasRating ? (
    <Star color='warning'/>
  ) : (
    <StarOutline />
  );
  const watchedIcon = hasWatched ? (
    <CheckCircleIcon color="success" />
  ) : (
    <RadioButtonUncheckedIcon />
  );
  const watchlistIcon = watchlistItem.data ? <BookmarkAddedIcon/> : <BookmarkBorder/>
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
  const onAddToList = async (listId: string) => {
    const item = await checkAndPopulate();
    addItemToList.mutateAsync({
      list_id: listId,
      item_id: item.id,
    });
    onCloseDialog();
  };
  const onAddToWatchlist = async () => {
    if (!user?.id) {
      throw new Error("no user");
    }
    const item = await checkAndPopulate();
    await add.mutateAsync({
      item_id: item.id,
      movie_ref_id: item.movie_ref_id,
      user_id: user?.id,
    });
  };
  
  const onRemoveFromWatchlist = async() => {
    if(!userItem){
      throw new Error('No movie to begin with')
    }
    if(!user){
      throw new Error('no user')
    }
    await removeFromWatchlist.mutateAsync({
      movie_ref_id: userItem?.movie_ref_id,
      user_id: user?.id
    })
  }
  const onWatchlistClick = watchlistItem.data ? onRemoveFromWatchlist : onAddToWatchlist

  return (
    <Stack
      sx={{ mt: 1, mb: 1 }}
      width={"100%"}
      direction="row"
      alignItems={"center"}
    >
      <Chip
        onClick={() =>
          onUpdateMovieStatus(hasWatched ? "not watched" : "watched")
        }
        sx={{ mr: 1 }}
        icon={watchedIcon}
        label={
          <Typography variant="caption">
            {hasWatched ? "Watched" : "Not watched"}
          </Typography>
        }
      />
      <Chip
        sx={{ mr: 1 }}
        onClick={() => setDialogName("rate")}
        icon={rateIcon}
        label={
          <Typography variant="caption">
            {userItem?.rating ? userItem.rating : "Rate"}
          </Typography>
        }
      />
      <IconButton  onClick={() => setDialogName("addList")}>
        <PlaylistAddIcon />
      </IconButton>

      <IconButton onClick={onWatchlistClick}>
        {watchlistIcon}
      </IconButton>
      <Dialog open={name === "rate"} onClose={onCloseDialog}>
        <Box sx={{ p: 1 }}>
          <RatingInputForm
            rating={userItem?.rating}
            movie_ref_id={userItem?.movie_ref_id || ""}
            onClose={onCloseDialog}
          />
          <Button sx={{ mt: 1 }} fullWidth onClick={onCloseDialog}>
            Cancel
          </Button>
        </Box>
      </Dialog>
      <Dialog open={name === "addList"} onClose={onCloseDialog}>
        <AddToListPage onClose={onCloseDialog} onAdd={onAddToList} />
      </Dialog>
    </Stack>
  );
};

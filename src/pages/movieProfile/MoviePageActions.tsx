import {
  Chip,
  Dialog,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import type { UserItem } from "../../hooks/queries/useGetUserItems";
import { RatingDisplay } from "../../components/RatingDisplay";
import { Add, BookmarkBorder, StarOutline } from "@mui/icons-material";
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

interface MoviePageActionsProps {
  userItem?: UserItem;
  isLoading: boolean;
  movieIdUrl: string;
}
export const MoviePageActions: React.FC<MoviePageActionsProps> = ({
  userItem,
  movieIdUrl,
  isLoading,
}) => {
  const { user } = useAuth();
  const hasWatched = userItem?.status === "watched";
  const hasRating = !!userItem?.rating;
  const update = useUpdateUserItem();
  const addItemToList = useAddItemToList();
  const add = useUpsertWatchlistItem();

  const checkAndPopulate = useGetCheckAndPopulate(movieIdUrl);
  const { name, setDialogName, onCloseDialog } = useDialogControl();
  const rateIcon = hasRating ? (
    <RatingDisplay rating={userItem.rating} />
  ) : (
    <StarOutline />
  );
  const watchedIcon = hasWatched ? (
    <CheckCircleIcon />
  ) : (
    <RadioButtonUncheckedIcon />
  );
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

  return (
    <Stack direction="row" alignItems={"center"}>
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
      <Chip
        onClick={() => setDialogName("addList")}
        icon={<Add />}
        label={"list"}
      />
      <IconButton onClick={onAddToWatchlist}>
        <BookmarkBorder />
      </IconButton>
      <Dialog open={name === "rate"} onClose={onCloseDialog}>
        <RatingInputForm
          rating={userItem?.rating}
          movie_ref_id={userItem?.movie_ref_id || ""}
          onClose={onCloseDialog}
        />
      </Dialog>
      <Dialog open={name === "addList"} onClose={onCloseDialog}>
        <AddToListPage onClose={onCloseDialog} onAdd={onAddToList} />
      </Dialog>
    </Stack>
  );
};

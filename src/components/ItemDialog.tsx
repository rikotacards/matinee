import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { DialogWrapper } from "./DialogWrapper";
import { ItemDetails } from "./ItemDetails";

import { DetailsInputForm } from "./DetailsInputForm";
import { useGetExternalMovieDetailsById } from "../hooks/queries/useGetMovieById";
import { useUpdateItem } from "../hooks/mutations/useUpdateItem";
import type { Item } from "../types/supabaseTypes";
import { Lists } from "../pages/Lists";
import type { UserItem } from "../hooks/queries/useGetUserItems";
import { useGetRating } from "../hooks/queries/useGetRating";
import { useGetMovieRef } from "../hooks/queries/useGetMovieRef";
interface ItemDialogProps {
  item: UserItem;
  onClose: () => void;
}
export const ItemDialog: React.FC<ItemDialogProps> = ({
  item,
  onClose,
}) => {
  const [page, setPage] = React.useState(0);
  const movie_ref = useGetMovieRef(item.movie_ref_id);
  const {data: ratingTableData} = useGetRating({movie_ref_id: item.movie_ref_id, user_id: item.user_id})
  const onBack = () => {
    setPage((p) => p - 1);
  };
  const update = useUpdateItem();
  const [rating, setRating] = React.useState(ratingTableData?.rating || 0);
  const [watchedDate, setWatchedDate] = React.useState<string | null>(null);
  const [hasWatched, setHasWatched] = React.useState(item.status === 'watched');
  const setWatched = (has: boolean) => {
    setHasWatched(has);
  };
  const movie = useGetExternalMovieDetailsById(movie_ref.data?.external_id);

  const onRatingChange = (r: number) => {
    setRating(r);
  };
  const onWatchedDateChange = (d: string) => {
    setWatchedDate(d);
  };

  if (!item) {
    return <Typography>No movie</Typography>;
  }
  const addToListClick = () => {
    setPage(3)
  }
  const onMoreOptions = () => {
    setPage(2);
  };
  const onUpdate = () => {
    update.mutate(
      {
        itemId: item.id,
        newRating: rating,
        date_watched: watchedDate,
        has_watched: hasWatched,
        api_id,
      },
      { onSuccess: () => onBack() }
    );
  };
  const goHome = () => {
    setPage(0);
  };
  return (
    <DialogWrapper
      open
      onClose={onClose}
      title={"details"}
      onBack={page > 0 ? goHome : undefined}
    >
      {page == 0 && (
        <>
          <ItemDetails
            edit={() => setPage(1)}
            item={item}
            rating={ratingTableData?.rating || 0}
            title={movie_ref.data?.title || ""}
            movieOverview={movie.data?.overview}
            onClose={onClose}
            addToList={addToListClick}
            release={movie_ref.data?.release || ""}
          />
        </>
      )}
      {page == 1 && (
        <>
          <DetailsInputForm
            movie={movie.data}
            rating={rating}
            onRatingChange={onRatingChange}
            setWatched={setWatched}
            hasWatched={hasWatched}
            watchedDate={watchedDate}
            onWatchedDateChange={onWatchedDateChange}
          />
          <Button onClick={onUpdate}>Update</Button>
        </>
      )}
      {page === 2 && (
        <Box>
          <Button>Delete</Button>
        </Box>
      )}
      {page === 3 && <Box sx={{p:1}}>
        <Lists/>
        </Box>}
    </DialogWrapper>
  );
};

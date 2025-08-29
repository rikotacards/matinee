import React from "react";
import { useGetUserItemsFromWatchlistByUserId } from "../hooks/queries/useGetWatchlistItemsByUserId";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import { MovieItem } from "../components/MovieItem";
import { MoreHoriz } from "@mui/icons-material";
import { useDialogControl } from "../hooks/useDialogControl";
import { useDeleteWatchlistItem } from "../hooks/mutations/useDeleteWatchlistItem";
interface MyWatchlistProps {
  myUserId: string;
}
export const MyWatchlist: React.FC<MyWatchlistProps> = ({ myUserId }) => {
  const watchlist = useGetUserItemsFromWatchlistByUserId({ userId: myUserId });
  const deleteItem = useDeleteWatchlistItem();
  const { name, onCloseDialog, setDialogName } = useDialogControl();
  if (watchlist.isLoading) {
    return <CircularProgress />;
  }
  if (!watchlist.data?.length) {
    return <Typography>Your watchlist is empty!</Typography>;
  }
  const onRemove = (movie_ref_id: string) => {
    deleteItem.mutate({
        user_id: myUserId,
        movie_ref_id
    })
  }
  return (
    <>
      {watchlist.data?.map((d) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MovieItem key={d.id} item={d} />
          <IconButton onClick={() => setDialogName(d.movie_ref_id)} size="small">
            <MoreHoriz fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Dialog onClose={onCloseDialog} open={!!name}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Button onClick={() => onRemove(name)}>Remove from watchlist</Button>
          <Button>Cancel</Button>
        </Box>
      </Dialog>
    </>
  );
};

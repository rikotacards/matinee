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
import { Delete, MoreHoriz } from "@mui/icons-material";
import { useDialogControl } from "../hooks/useDialogControl";
import { useDeleteWatchlistItem } from "../hooks/mutations/useDeleteWatchlistItem";
interface MyWatchlistProps {
  myUserId: string;
}
interface OptionsWrapperProps {
  children: React.ReactNode;
  movieRefId: string;
  userId: string;
  show: boolean;
}
const OptionsWrapper: React.FC<OptionsWrapperProps> = ({show, children, movieRefId, userId}) => {
    const deleteItem = useDeleteWatchlistItem();

    const onRemove = (movie_ref_id: string) => {
    deleteItem.mutate({
      user_id: userId,
      movie_ref_id,
    });
  };
  return <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'row', mb:2}}>
    {children}
    {show && <IconButton onClick={() => onRemove(movieRefId)}>
      <Delete/>
    </IconButton>}
  </Box>
}
export const MyWatchlist: React.FC<MyWatchlistProps> = ({ myUserId }) => {
  const watchlist = useGetUserItemsFromWatchlistByUserId({ userId: myUserId });
  const [show, setShow] = React.useState(false)
  const onMore = () => {
    setShow(true)
  }
  
  if (watchlist.isLoading) {
    return <CircularProgress />;
  }
  if (!watchlist.data?.length) {
    return <Typography>Your watchlist is empty!</Typography>;
  }
 
  return (
    <>
      {watchlist.data?.map((d) => (
        <OptionsWrapper show={show} key={d.id} movieRefId={d.movie_ref_id} userId={myUserId}>
          <MovieItem key={d.id} item={d} />
        </OptionsWrapper>
      ))}
     
    </>
  );
};

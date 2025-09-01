import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Add, Close, Delete, MoreHoriz } from "@mui/icons-material";
import { useGetUserItemsFromWatchlistByUserId } from "../hooks/queries/useGetWatchlistItemsByUserId";
import { useDeleteWatchlistItem } from "../hooks/mutations/useDeleteWatchlistItem";
import { MovieItem } from "../components/MovieItem";
interface OptionsWrapperProps {
  children: React.ReactNode;
  movieRefId: string;
  userId: string;
  show: boolean;
}
const OptionsWrapper: React.FC<OptionsWrapperProps> = ({
  show,
  children,
  movieRefId,
  userId,
}) => {
  const deleteItem = useDeleteWatchlistItem();

  const onRemove = (movie_ref_id: string) => {
    deleteItem.mutate({
      user_id: userId,
      movie_ref_id,
    });
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 2 }}
    >
      {children}
      {show && (
        <IconButton onClick={() => onRemove(movieRefId)}>
          {deleteItem.isPending ? <CircularProgress color='error' /> : <Close color='error'/>}
        </IconButton>
      )}
    </Box>
  );
};
export const MyWatchlistPage: React.FC = () => {
  const { user, loading } = useAuth();
  const watchlist = useGetUserItemsFromWatchlistByUserId({ userId: user?.id });
  const [show, setShow] = React.useState(false);
  const onMore = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };
  if (loading) {
    return <CircularProgress />;
  }
  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 300,
        maxWidth: 500,
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Typography fontWeight="bold" variant="h4">
          Watchlist
        </Typography>

        <IconButton sx={{ ml: "auto" }}>
          <Add />
        </IconButton>
        <IconButton onClick={show ? () => onClose() : () => onMore()}>
          <MoreHoriz />
        </IconButton>
      </Stack>
      {watchlist.data?.map((d) => (
        <OptionsWrapper
          show={show}
          key={d.id}
          movieRefId={d.movie_ref_id}
          userId={user.id}
        >
          <MovieItem key={d.id} item={d} />
        </OptionsWrapper>
      ))}
      {watchlist.data?.length === 0 && <Typography color='textSecondary'>Your watchlist is empty. Press the + icon to add a movie, or search for one at the top.</Typography>}
    </Box>
  );
};

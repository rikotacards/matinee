import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import type { UserItem } from "../hooks/queries/useGetUserItems";
import { Close } from "@mui/icons-material";
import { useDeleteWatchlistItem } from "../hooks/mutations/useDeleteWatchlistItem";
import { MovieItem } from "../components/MovieItem";
import { useGetUserItemsFromWatchlistByUserId } from "../hooks/queries/useGetWatchlistItemsByUserId";
import { MovieItemSkeletonList } from "./MovieItemSkeletonList";
interface OptionsWrapperProps {
  children: React.ReactNode;
  movieRefId: string | number;
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
  const icon = !deleteItem.isPending ? (
    <IconButton onClick={() => onRemove(movieRefId)}>
      <Close color="error" />
    </IconButton>
  ) : (
    <CircularProgress size={20} color="error" />
  );
  const onRemove = (movie_ref_id: string | number) => {
    deleteItem.mutate({
      user_id: userId,
      movie_ref_id,
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mb: 2,
      }}
    >
      {children}
      <Box sx={{ml:'auto'}}>{show && icon}</Box>
    </Box>
  );
};
interface WatchlistItemsProps {
  show: boolean;
  userId: string;
}
export const WatchlistItems: React.FC<WatchlistItemsProps> = ({
  show,
  userId,
}) => {
  const watchlist = useGetUserItemsFromWatchlistByUserId({
    userId: userId,
  });
  console.log(
    "walooo",
    watchlist.isLoading,
    watchlist.isPending,
    watchlist.isEnabled
  );
  if (watchlist.isLoading) {
    return <MovieItemSkeletonList />;
  }
  if (watchlist.isPending) {
    return <MovieItemSkeletonList />;
  }
  if (!watchlist.data?.length) {
    return <Typography>No data</Typography>;
  }
  return (
    <>
      {watchlist.data.map((d) => {
        return (
          <OptionsWrapper
            show={show}
            key={d.id}
            movieRefId={d.movie_ref_id}
            userId={userId}
          >
            <MovieItem key={d.id} item={d} />
          </OptionsWrapper>
        );
      })}
    </>
  );
};

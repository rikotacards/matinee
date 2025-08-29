import React from "react";
import { useGetUserItemsFromWatchlistByUserId } from "../hooks/queries/useGetWatchlistItemsByUserId";
import { CircularProgress, Typography } from "@mui/material";
import { MovieItem } from "../components/MovieItem";
interface MyWatchlistProps {
  myUserId: string;
}
export const MyWatchlist: React.FC<MyWatchlistProps> = ({ myUserId }) => {
  const watchlist = useGetUserItemsFromWatchlistByUserId({ userId: myUserId });

  if (watchlist.isLoading) {
    return <CircularProgress />;
  }
  if (!watchlist.data?.length) {
    return <Typography>Your watchlist is empty!</Typography>;
  }
  return (
    <>
      {watchlist.data?.map((d) => (
        <MovieItem key={d.id} item={d} />
      ))}
    </>
  );
};

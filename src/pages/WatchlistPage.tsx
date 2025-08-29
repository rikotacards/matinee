import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useGetUserItemsFromWatchlistByUserId } from "../hooks/queries/useGetWatchlistItemsByUserId";
import { useAuth } from "../hooks/useAuth";
import { MovieItem } from "../components/MovieItem";
import { MyWatchlist } from "./MyWatchlist";

export const MyWatchlistPage: React.FC = () => {
  const { user, loading } = useAuth();
   
  if (loading) {
    return <CircularProgress />;
  }
  if (!user) {
    return null;
  }
  return <MyWatchlist myUserId={user.id}/>
};

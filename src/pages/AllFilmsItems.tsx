import React from "react";
import { useGetUserItems } from "../hooks/queries/useGetUserItems";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { MovieItem } from "../components/MovieItem";
import { MovieItemSkeleton } from "../components/MovieItemSkeleton";
interface AllFilmsItems {
  userId: string;
}
const loadingSkeletons = [1, 1, 1, 1, 1, 1, 1, 1];
export const AllFilmsItems: React.FC<AllFilmsItems> = ({ userId }) => {
  const items = useGetUserItems(userId);
  const nav = useNavigate();
  if (items.isLoading) {
    return (
      <>
        {loadingSkeletons.map((_, i) => (
          <MovieItemSkeleton key={i} />
        ))}
      </>
    );
  }
  const goToMovie = (movieRefId: string | number) => {
    const path = "/movies/" + movieRefId + "/true";
    const q = `?ratedBy=${userId}`;
    nav(path + q);
  };
  const displayedItems = items.data?.map((i) => (
    <Box
      key={i.id}
      sx={{ mb: 2, cursor: "pointer" }}
      onClick={() => goToMovie(i.movie_ref_id)}
    >
      <MovieItem item={i} />
    </Box>
  ));
  if (items.data?.length === 0) {
    return <Typography>You have not added any films</Typography>;
  }
  return <>{displayedItems}</>;
};

import React from "react";
import { useGetItemsByListId } from "../hooks/queries/useGetItemsByList";
import { MovieItemSkeletonList } from "../pages/MovieItemSkeletonList";
import { MovieItem } from "./MovieItem";
import { Box,  } from "@mui/material";
import { useNavigate } from "react-router";
interface CustomListItemsProps {
  listId: string;
  listOwner: string;
}
export const CustomListItems: React.FC<CustomListItemsProps> = ({
  listId,
  listOwner,
}) => {
  const items = useGetItemsByListId(listId);
  const nav = useNavigate();
  if (items.isLoading) {
    return <MovieItemSkeletonList />;
  }
  const goToMovie = (movieId: string | number, isInternal: boolean) => {
    const path = "/movies/" + movieId + '/' + isInternal;
    const q = `?ratedBy=${listOwner}`
    nav(path + q);
  };
  return (
    <Box>
      {items.data?.map((i) => (
        <Box
          sx={{
            mb:2,
            cursor: 'pointer',
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={() => goToMovie(i.movie_ref_id, true)}
          key={i.id}
        >
          <MovieItem item={i} />
        </Box>
      ))}
    </Box>
  );
};

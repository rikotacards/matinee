import React from "react";
import { useGetItemsByListId } from "../hooks/queries/useGetItemsByList";
import { MovieItemSkeletonList } from "../pages/MovieItemSkeletonList";
import { MovieItem } from "./MovieItem";
import { Box, IconButton,  } from "@mui/material";
import { useNavigate } from "react-router";
import { BackIconButton } from "./BackIconButton";
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
  const goToMovie = (itemId: string, movieRefId: string | number) => {
    const path = "/movies/" + itemId;
    const q = `?ratedBy=${listOwner}&item_id=${itemId}&movie_ref_id=${movieRefId}`;
    nav(path + q);
  };
  return (
    <Box>
      {items.data?.map((i) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={() => goToMovie(i.id, i.movie_ref_id)}
          key={i.id}
        >
          <MovieItem item={i} />
        </Box>
      ))}
    </Box>
  );
};

import React from "react";
import { useGetItemsByListId } from "../hooks/queries/useGetItemsByList";
import { MovieItemSkeletonList } from "../pages/MovieItemSkeletonList";
import { MovieItem } from "./MovieItem";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { ItemOptionsWrapper } from "../pages/ItemOptionsWrapper";
import { useDeleteItemFromList } from "../hooks/mutations/useDeleteItemFromList";
interface CustomListItemsProps {
  listId: string;
  listOwner: string;
  showOptions?: boolean;
}
export const CustomListItems: React.FC<CustomListItemsProps> = ({
  listId,
  listOwner,
  showOptions,
}) => {
  const items = useGetItemsByListId(listId);
  const removeItem = useDeleteItemFromList();
  const nav = useNavigate();
  if (items.isLoading) {
    return <MovieItemSkeletonList />;
  }
  const onRemove = (listId: string | number, item_id: string | number) => {
    removeItem.mutateAsync({ list_id: listId, item_id });
  };
  const goToMovie = (movieId: string | number, isInternal: boolean) => {
    const path = "/movies/" + movieId + "/" + isInternal;
    const q = `?ratedBy=${listOwner}`;
    nav(path + q);
  };
  if (items.data?.length === 0) {
    return <Typography sx={{ mt: 1 }}>This list is empty</Typography>;
  }
  return (
    <Box sx={{flexDirection: 'column', width: "100%", display: "flex" }}>
      {items.data?.map((i) => (
        <Box
          sx={{
            mb: 2,
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
          onClick={() => goToMovie(i.movie_ref_id, true)}
          key={i.id}
        >
          <ItemOptionsWrapper
            onClick={() => onRemove(listId, i.id)}
            open={showOptions}
          >
            <MovieItem item={i} />
          </ItemOptionsWrapper>
        </Box>
      ))}
    </Box>
  );
};

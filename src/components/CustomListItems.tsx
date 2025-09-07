import React from "react";
import { useGetItemsByListId } from "../hooks/queries/useGetItemsByList";
import { MovieItemSkeletonList } from "../pages/MovieItemSkeletonList";
import { MovieItem } from "./MovieItem";
import { Box, Typography,  } from "@mui/material";
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
  if(items.data?.length === 0){
    return <Typography sx={{mt:1}}>This list is empty</Typography>
  }
  return (
    <Box sx={{width:'100%', display: 'flex'}}>
      {items.data?.map((i) => (
        <Box
          sx={{
            mb:2,
            cursor: 'pointer',
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width:'100%',
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

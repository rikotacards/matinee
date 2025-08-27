import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

import { RatingDisplay } from "./RatingDisplay";
import { getImage } from "../utils/getImage";
import type { UserItem } from "../hooks/queries/useGetUserItems";
import { useGetMovieRef } from "../hooks/queries/useGetMovieRef";
import { useGetRating } from "../hooks/queries/useGetRating";
interface CustomListItemProps {
  item: UserItem;
}
const size = 50;
export const CustomItem: React.FC<CustomListItemProps> = ({ item }) => {
  console.log('lol', item)
  const { movie_ref_id, last_watched_date } = item;
  const { data: movie_ref } = useGetMovieRef(movie_ref_id);
  const { data: rating } = useGetRating({
    movie_ref_id,
    user_id: item.user_id,
  });
  const poster = movie_ref?.poster_path
    ? getImage(movie_ref.poster_path)
    : undefined;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        minWidth: 300
      }}
    >
      <Avatar sx={{ height: size, width: size, mr: 1 }} src={poster} />
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            fontWeight={"bold"}
            sx={{ textTransform: "capitalize", mr: 1 }}
          >
            {movie_ref?.title} -
          </Typography>
          <RatingDisplay rating={rating?.[0]?.rating || 0} />
        </Box>
        {last_watched_date ? (
          <Typography color="textSecondary" variant="body2">
            Watched:{" "}
            {last_watched_date
              ? new Date(last_watched_date).toDateString()
              : "no watch date added"}
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No watch date added
          </Typography>
        )}
      </Box>
    </Box>
  );
};

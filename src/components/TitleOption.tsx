import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import React from "react";
interface TitleOptionsProps {
  title: string;
  releaseDate: string;
  posterPath?: string;
}
export const TitleOption: React.FC<TitleOptionsProps> = ({
  posterPath,
  releaseDate,
  title,
}) => {
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  const imageUrl = posterPath
    ? `${posterBaseUrl}${posterPath}`
    : "https://via.placeholder.com/500x750.png?text=No+Image";
  return (
    <MenuItem  sx={{ p: 1, display: "flex", flexDirection: "row" }}>
      <Avatar sx={{ mr: 1, height: 80, width: 80 }} src={imageUrl} />
      <Box>
        <Typography sx={{textWrap: 'wrap'}} fontWeight={"bold"}>{title}</Typography>
        <Typography variant="caption" color="textSecondary">
          Release
        </Typography>
        <Typography variant='body2'>{releaseDate}</Typography>
      </Box>
    </MenuItem>
  );
};

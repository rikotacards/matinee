import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
interface MovieProfileHeaderProps {
  poster_path?: string;
  title: string;
  release: string;
  movieId: number;
}

export const MovieProfileHeader: React.FC<MovieProfileHeaderProps> = ({
  poster_path,
  title,
  release,
  movieId,
}) => {


  if (!movieId) {
    return <Typography>Cant find the movie</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Avatar sx={{ mr: 2, height: 150, width: 150 }} src={poster_path} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ mt: 1 }} fontWeight={"bold"} variant="h6">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            {release ? new Date(release).toDateString() : null}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

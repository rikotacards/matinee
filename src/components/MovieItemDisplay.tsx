import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

import { RatingDisplay } from "./RatingDisplay";

interface CustomListItemProps {
  title: string;
  fullPosterPath: string;
  lastWatchDate?: string;
  rating?: number;
}
const size = 50;
export const MovieItemDisplay: React.FC<CustomListItemProps> = ({
  title,
  fullPosterPath,
  lastWatchDate,
  rating,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        minWidth: 300,
      }}
    >
      <Avatar sx={{ height: size, width: size, mr: 1 }} src={fullPosterPath} />
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            fontWeight={"bold"}
            sx={{ textTransform: "capitalize", mr: 1 }}
          >
            {title}
          </Typography>
          <Typography sx={{ mr: 1 }} color="textSecondary">
            -
          </Typography>
          <RatingDisplay rating={rating || 0} />
        </Box>
        {lastWatchDate ? (
          <Typography color="textSecondary" variant="body2">
            Watched:{" "}
            {lastWatchDate
              ? new Date(lastWatchDate).toDateString()
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

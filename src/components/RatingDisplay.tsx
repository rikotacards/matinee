import { Star } from "@mui/icons-material";
import { Box, Typography, type TypographyProps } from "@mui/material";
import React from "react";
interface RatingDisplayProps {
  rating: number;
  textVariant?: TypographyProps['variant']
}
export const RatingDisplay: React.FC<RatingDisplayProps> = ({textVariant, rating }) => {
  if (rating === 0) {
    return <Typography variant='caption'>Not rated</Typography>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        fontFamily: "",
      }}
    >
      <Typography variant={textVariant} fontWeight={"bold"}>{rating}/5</Typography>
      <Star sx={{ ml: 0.1 }} color="warning" fontSize="small" />
    </Box>
  );
};

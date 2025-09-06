import { Star } from "@mui/icons-material";
import { Box, Typography, type TypographyProps } from "@mui/material";
import React from "react";
interface RatingDisplayProps {
  rating: number | null | undefined;
  textVariant?: TypographyProps['variant']
}
export const RatingDisplay: React.FC<RatingDisplayProps> = ({textVariant, rating }) => {
  if (!rating ) {
    return <Typography color='textSecondary' sx={{ml:'auto'}} variant='caption'>Not rated</Typography>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Star sx={{ mr: 0.1, scale: 0.8 }} color="warning" />
      <Typography variant={'body2'} fontWeight={"bold"}>{rating}/5</Typography>
    </Box>
  );
};

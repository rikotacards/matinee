import { ArrowRight } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
interface ListPreviewProps {
  name: string;
  onClick: () => void;
}import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export const ListPreview: React.FC<ListPreviewProps> = ({ onClick, name }) => {
  const nav = useNavigate();
  const go = () => {
    nav("/list");
  };
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 2,
        mb: 1,
      }}
      component={Card}
      variant="outlined"
    >
      <Typography sx={{ mr: 1 }} fontWeight={"bold"}>
        {name}
      </Typography>
      <Typography color="textSecondary">14 items</Typography>
      <KeyboardArrowRightIcon sx={{ ml: "auto" }} />
    </Box>
  );
};

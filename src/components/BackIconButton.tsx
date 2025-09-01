import { ArrowBackIosNew } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
interface BackIconButtonProps {
  onBack?: () => void;
}
export const BackIconButton: React.FC<BackIconButtonProps> = ({ onBack }) => {
  const nav = useNavigate();
  const onBackDefault = () => {
    nav(-1);
  };
  return (
    <IconButton sx={{mr:1}} onClick={onBack ? () => onBack() : () => onBackDefault()}>
      <ArrowBackIosNew />
    </IconButton>
  );
};

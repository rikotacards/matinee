import { Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { BackIconButton } from "./BackIconButton";
interface DialogWrapperProps {
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
  title: string;
  onBack?: () => void;
  fullScreen?: boolean;
}
export const DialogWrapper: React.FC<DialogWrapperProps> = ({
  open,
  title,
  onClose,
  children,
  onBack,
  fullScreen,
}) => {
  return (
    <Dialog fullScreen={fullScreen} onClose={onClose} open={open}>
      <AppBar variant="outlined" sx={{ position: "relative" }}>
        <Toolbar variant="dense">
          {onBack && <BackIconButton onBack={onBack} />}
          <Typography>{title}</Typography>
          <IconButton sx={{ ml: "auto" }} onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexDirection: "column", display: "flex", minWidth: 300 }}>
        {children}
      </Box>
    </Dialog>
  );
};

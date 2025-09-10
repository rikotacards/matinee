import { Close } from "@mui/icons-material";
import { Box, CircularProgress, Collapse, IconButton } from "@mui/material";
import React from "react";
interface ItemOptionsWrapperProps {
  children: React.ReactNode;
  onClick: () => void;
  open?: boolean;
}
export const ItemOptionsWrapper: React.FC<ItemOptionsWrapperProps> = ({
  children,
  onClick,
  open
}) => {
  const [loading, setLoading] = React.useState(false);
  const onItemClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  const removeIcon = loading ? (
    <CircularProgress color="error" size={20} />
  ) : (
    <IconButton onClick={async (e) => {
        e.stopPropagation()
        await onItemClick()}}>
      <Close color="error" fontSize="small" />
    </IconButton>
  );
  return (
    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
      {children}
      <Box sx={{ ml: "auto" }}>
        <Collapse orientation="horizontal" in={open}>
          {removeIcon}
        </Collapse>
      </Box>
    </Box>
  );
};

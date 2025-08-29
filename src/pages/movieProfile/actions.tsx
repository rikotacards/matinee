import { Add } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import React, { type JSX } from "react";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
interface IconLayoutProps {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}
export const IconLayout: React.FC<IconLayoutProps> = ({
  onClick,
  children,
  label,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mr: 1,
      }}
    >
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <IconButton onClick={onClick} size="small">
          {children}
        </IconButton>
      </Box>
      <Typography sx={{textWrap: 'wrap',  textAlign: "center" }} variant="caption">
        {label}
      </Typography>
    </Box>
  );
};
interface ActionItem {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}
interface ActionsProps {
  actions: ActionItem[];
}
export const Actions: React.FC<ActionsProps> = ({ actions }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent={"space-around"}>
      {actions.map((a) => (
        <IconLayout onClick={a.onClick} label={a.label}>
          {a.icon}
        </IconLayout>
      ))}
    </Stack>
  );
};

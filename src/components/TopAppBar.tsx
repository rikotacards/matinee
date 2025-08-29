import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

import { AddItemFormNew } from "./AddItemFormNew";
const pages = [
  { label: "Your films", path: "all-films" },
  { label: "watchlist", path: "watchlist" },
  { label: "lists", path: "lists" },
];
export const TopAppBar: React.FC = () => {
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);
  return (
    <AppBar variant="outlined" elevation={0}>
      <Toolbar>
        <Typography
          onClick={() => nav("/")}
          sx={{ mr: 2 }}
          fontWeight={"bold"}
          variant="h5"
        >
          Matinée
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {pages.map((p) => (
            <Button sx={{whiteSpace: 'nowrap'}} key={p.label} color="inherit" onClick={() => nav(p.path)}>
              {p.label}
            </Button>
          ))}
        </Box>
        <Button onClick={() => setOpen(true)}>Add</Button>
        <IconButton sx={{ ml: "auto" }} size="small">
          <Avatar />
        </IconButton>
      </Toolbar>
      {open && <AddItemFormNew onClose={() => setOpen(false)} />}
    </AppBar>
  );
};

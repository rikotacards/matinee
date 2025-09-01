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
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { Search } from "@mui/icons-material";
const pages = [
  { label: "Your films", path: "all-films" },
  { label: "watchlist", path: "watchlist" },
  { label: "lists", path: "lists" },
];

export const TopAppBar: React.FC = () => {
  const nav = useNavigate();
  const {user} = useAuth();
  const location = useLocation();
  const goProfile = () => {
    nav("profile");
  };
  const goHome = () => {
    nav("/");
  };
  const page = location.pathname.split("/")?.[1];

  return (
    <AppBar variant="outlined" elevation={0}>
      <Toolbar>
        <Typography
          onClick={goHome}
          sx={{ mr: 2, cursor: "pointer" }}
          fontWeight={"bold"}
          variant="h5"
        >
          Matinée
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {pages.map((p) => (
            <Button
              variant="text"
              color={page === p.path ? "primary" : "inherit"}
              sx={{
                whiteSpace: "nowrap",
                fontWeight: page === p.path ? "bold" : undefined,
              }}
              key={p.label}
              onClick={() => nav(p.path)}
            >
              {p.label}
            </Button>
          ))}
          <IconButton onClick={() => nav('search')}>
            <Search/>
          </IconButton>
        </Box>
        {/* <Button onClick={() => setOpen(true)}>Add</Button> */}
        <Box sx={{display: user ? '' : 'none', pr: 1, ml: "auto" }}>
          <IconButton onClick={goProfile} size="small">
            <Avatar sx={{ height: 30, width: 30 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

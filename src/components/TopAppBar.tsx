import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { Search } from "@mui/icons-material";
import { useIsSmall } from "../hooks/useIsSmall";
const pages = [
  { label: "Your films", path: "all-films" },
  { label: "watchlist", path: "watchlist" },
  { label: "lists", path: "lists" },
];

export const TopAppBar: React.FC = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const isSmall = useIsSmall();
  const location = useLocation();
  const goProfile = () => {
    nav("profile");
  };
  const goHome = () => {
    nav("/all-films");
  };
  const page = location.pathname.split("/")?.[1];
  const buttons = pages.map((p) => (
    <Button
      variant="text"
      color={page === p.path ? "primary" : "inherit"}
      sx={{
        whiteSpace: "nowrap",
        fontWeight: page === p.path ? "bold" : undefined,
      }}
      size={isSmall ? "large" : undefined}
      key={p.label}
      onClick={() => nav(p.path)}
    >
      {p.label}
    </Button>
  ));
  return (
    <AppBar sx={{ }} elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alingItems: "center",
        }}
      >
        <Box sx={{mr:1,display: 'flex', flexDirection: 'row',  alignItems: "center" }}>
          <Typography
            onClick={goHome}
            sx={{
              backgroundColor: "palette.default",
              zIndex: 2,
              position: "sticky",
              left: 0,
              cursor: "pointer",
            }}
            fontWeight={"bold"}
            variant={isSmall ? "h6" : "h5"}
          >
            Matinée
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            overlfowX: "scroll",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {buttons}
          <IconButton onClick={() => nav("search")}>
            <Search color={page === "search" ? "primary" : undefined} />
          </IconButton>
          <Box sx={{ display: user ? "" : "none", pr: 1, ml: "auto" }}>
            <IconButton onClick={goProfile} size="small">
              <Avatar sx={{ height: 30, width: 30 }} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

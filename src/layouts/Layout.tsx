import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { TopAppBar } from "../components/TopAppBar";

export const Layout: React.FC = () => {
  return (
    <Box>
      <TopAppBar />
      <Toolbar />
      <Box
        sx={{
          margin: "0 auto",
          display: "flex",
          p: 2,
          width:'100%',
          justifyContent: "center",
        }}
        component="main"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

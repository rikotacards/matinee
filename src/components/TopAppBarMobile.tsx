import { Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import React from "react";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import { useLocation, useNavigate } from "react-router";
interface TopAppBarMobileProps {
  onSearch: () => void;
}
export const TopAppBarMobile: React.FC<TopAppBarMobileProps> = ({
  onSearch,
}) => {
  const location = useLocation();
  const nav = useNavigate();

  const page = location.pathname.split("/")?.[1];
  const goProfile = () => {
    nav("profile");
  };
  const goHome = () => {
    nav("/all-films");
  };

  const [showFull, setShow] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setShow(false), 4000);
  }, []);
  return (
      <Toolbar
        sx={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {
          <Collapse in={!showFull} orientation="horizontal">
            <Typography
              color="textSecondary"
              sx={{ p: 1, mr:2 }}
              fontWeight={"bold"}
              variant="h5"
              onClick={goHome}
            >
              M
            </Typography>
          </Collapse>
        }

        <Collapse in={showFull} orientation="horizontal">
        <Box sx={{mr:3}}>

          <Typography sx={{ p: 1, mr: 4}} fontWeight={"bold"} variant="h5">
            Matinée
          </Typography>
        </Box>
        </Collapse>
        {/* <Avatar sx={{ alignSelf: "flex-end", height: 30, width: 30 }} /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <IconButton
            sx={{ mr: 2 }}
            color={(page === "all-films" || page === '/') ? "primary" : undefined}
            onClick={goHome}
          >
            <LocalMoviesRoundedIcon />
          </IconButton>
          <IconButton
            sx={{ mr: 2 }}
            color={page === "watchlist" ? "primary" : undefined}
            onClick={() => nav("watchlist")}
          >
            <BookmarkRoundedIcon />
          </IconButton>
          <IconButton
            sx={{ mr: 2 }}
            color={page === "lists" ? "primary" : undefined}
            onClick={() => nav("lists")}
          >
            <PlaylistAddRoundedIcon />
          </IconButton>
          <IconButton
            sx={{ mr: 2 }}
            color={page === "search" ? "primary" : undefined}
            onClick={() => onSearch()}
          >
            <Search />
          </IconButton>
          <Avatar
            onClick={goProfile}
            sx={{ height: 30, width: 30, ml: "auto" }}
          />
        </Box>
      </Toolbar>
  );
};

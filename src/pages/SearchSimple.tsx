import {
  AppBar,
  Box,
  Card,
  Dialog,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
interface SearchSimpleProps {
  open: boolean;
  onClose: () => void;
}
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";
import { ChevronLeft, Close, InfoOutline } from "@mui/icons-material";
import { SearchResult } from "./SearchResult";
import { useDebounce } from "../hooks/useDebounce";
export const SearchSimple: React.FC<SearchSimpleProps> = ({
  open,
  onClose,
}) => {
  const nav = useNavigate();
  const [showClear, setClear] = React.useState(false);
  const [text, setText] = React.useState("");
  const onSearch = () => {
    const encodedMovieName = encodeURIComponent(text);
    console.log(encodedMovieName);
    nav("/search" + "/" + encodedMovieName);
  };
  const onClear = () => {
    setClear(false);
    setText("");
  };
  const onChange = (e: string) => {
    setClear(true);
    setText(e);
  };
  const [showResults, setShowResults] = React.useState(false);
  const onShowResults = () => {
    setClear(true);
    setShowResults(true);
  };
  const debouncedName = useDebounce(text, 500);

  return (
    <Dialog
      sx={{ overflow: "hidden" }}
      autoFocus
      fullScreen
      open={open}
      onClose={onClose}
    >
      <Box
        elevation={1}
        component={Card}
        sx={{
          height: "100%",
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <AppBar position="relative" variant="outlined">
          <Toolbar>
            <IconButton onClick={onClose} sx={{ ml: "1" }}>
              <ChevronLeft />
            </IconButton>
            <Typography fontWeight={"bold"}>Back</Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            width: 400,
            mt: 2,
            overflow: "hidden",
          }}
        >
          <TextField
            fullWidth
            placeholder="Search movie"
            autoFocus={true}
            value={text}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClear()}>
                    {showClear ? <Close /> : <ChevronRightIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => onChange(e.target.value)}
          />
          <Box sx={{ mt: 2, mb: 2, display: "flex", flexDirection: "row" }}>
            <InfoOutline fontSize="small" color="info" sx={{ mr: 1 }} />
            <Typography color="textSecondary" variant="body2">
              You can only search for movies. Tv shows coming soon.
            </Typography>
          </Box>
          <Box
            sx={{
              overflowY: "auto",
              display: "flex",
            }}
          >
            {debouncedName && <SearchResult movieName={debouncedName} />}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

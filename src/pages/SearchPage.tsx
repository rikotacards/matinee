import { Close } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { useNavigate } from "react-router";
import {
 
  InfoOutline,
  ChevronRight,
} from "@mui/icons-material";
import { useDebounce } from "../hooks/useDebounce";
import { SearchResult } from "./SearchResult";

export const SearchPage: React.FC = () => {
  const nav = useNavigate();
  const [showClear, setClear] = React.useState(false);
  const [text, setText] = React.useState("");
  const onClear = () => {
    setClear(false);
    setText("");
  };
  const debouncedName = useDebounce(text, 500);

  const onChange = (e: string) => {
    setClear(true);
    setText(e);
  };
  return (
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
                {showClear ? <Close /> : <ChevronRight />}
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
  );
};

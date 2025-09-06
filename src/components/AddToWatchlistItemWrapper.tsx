import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { Add } from "@mui/icons-material";
import { useAddToWatchlist } from "../hooks/mutations/useAddToWatchlist";
interface AddToWatchlistItemWrapperProps {
  children: React.ReactNode;
  movieId: string | number;
  isInternal: boolean;
  onClose: () => void;
}
export const AddToWatchlistItemWrapper: React.FC<
  AddToWatchlistItemWrapperProps
> = ({ onClose, movieId, isInternal, children }) => {
  const addToWatchlist = useAddToWatchlist(movieId, isInternal);
  const [loading, setLoading] = React.useState(false);

  const onClick = async () => {
    setLoading(true);
    await addToWatchlist();
    onClose();
    setLoading(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      onClick={() => onClick()}
    >
      {children}
      {loading ? <CircularProgress /> : <Add sx={{ ml: "auto" }} />}
    </Box>
  );
};

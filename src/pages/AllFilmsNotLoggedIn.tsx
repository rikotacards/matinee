import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { useSignIn } from "../hooks/useSignIn";
import { SearchButton } from "../components/SearchButton";

export const AllFilmsNotLoggedIn: React.FC = () => {
  const signIn = useSignIn();
  if (signIn.isPending) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        cursor: "pointer",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onClick={() => signIn.mutate()}
    >
      <SearchButton />
    </Box>
  );
};

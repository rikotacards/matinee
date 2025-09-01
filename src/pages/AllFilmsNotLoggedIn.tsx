import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useSignIn } from "../hooks/useSignIn";

export const AllFilmsNotLoggedIn: React.FC = () => {
  const signIn = useSignIn();
  if (signIn.isPending) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        cursor: "default",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant={"h2"} fontWeight={"bold"}>
        Track films you've watched. Save those you want to see. Tell your
        friends whats good.
      </Typography>
      <Box
        sx={{
          maxWidth: 300,
          width: "100%",
          position: "sticky",
          bottom: "0",
          p: 1,
        }}
      >
        <Button
          onClick={() => signIn.mutate()}
          fullWidth
          variant="contained"
          color="success"
        >
          Get started
        </Button>
      </Box>
    </Box>
  );
};

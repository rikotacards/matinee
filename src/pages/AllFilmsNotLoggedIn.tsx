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
        height:'100%',
        display: "flex",
        position:  'relative',
        flexDirection: "column",
        alignItems: "center",
        p:2,
      }}
    >
      <Typography sx={{mb:2}} variant={"h3"} fontWeight={"bold"}>
        Track films you've watched. Save those you want to see. Tell your
        friends whats good.
      </Typography>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          bottom: "0",
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

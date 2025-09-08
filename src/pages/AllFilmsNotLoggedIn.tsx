import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useSignIn } from "../hooks/useSignIn";
import { PageWrapper } from "../layouts/PageWrapper";

export const AllFilmsNotLoggedIn: React.FC = () => {
  const signIn = useSignIn();
  if (signIn.isPending) {
    return <CircularProgress />;
  }
  return (
    <PageWrapper>

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
         </PageWrapper>

  );
};

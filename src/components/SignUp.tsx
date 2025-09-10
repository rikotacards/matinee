import { Box, Button, Typography } from "@mui/material";
import { useSignIn } from "../hooks/useSignIn";

export const SignUp: React.FC = () => {
  const signIn = useSignIn();
  return (
    <Box sx={{p:2}}>
      <Typography fontWeight={'bold'} variant='h5'>Sign up to get started</Typography>
      <Button color='success' sx={{mt:1}} variant='contained' onClick={() => signIn.mutateAsync()} fullWidth>
        Sign up
      </Button>
    </Box>
  );
};

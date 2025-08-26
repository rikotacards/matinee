import { Box, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
interface InputSpacingLabelProps {
  label?: string;
}
export const InputSpacingLabel: React.FC<
  InputSpacingLabelProps & PropsWithChildren
> = ({ children, label }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{mb:1}} variant="body2">{label}</Typography>
      {children}
    </Box>
  );
};

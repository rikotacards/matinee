import { Box, Stack, Typography } from "@mui/material";
import React from "react";
interface PageWrapperProps {
  pageName?: string;
  desc?: React.ReactNode;
  children: React.ReactNode;
  buttons?: React.ReactNode;
}
export const PageWrapper: React.FC<PageWrapperProps> = ({
  pageName,
  desc,
  buttons,
  children,
}) => {
  return (
    <Box
      sx={{ height:'100%',  display: "flex", flexDirection: "column", width: "100%" }}
      maxWidth={500}
    >
      <Stack sx={{ mb: 2 }} direction="row" alignItems="center">
        <Stack direction="column">
          {pageName && (
            <Typography
              sx={{ textTransform: "capitalize" }}
              fontWeight={"bold"}
              variant="h4"
            >
              {pageName}
            </Typography>
          )}
          {desc}
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            ml: "auto",
          }}
        >
          {buttons}
        </Box>
      </Stack>
      <Box
        sx={{height:'100%', display: "flex", flexDirection: "column", mb: 2, width: "100%" }}
      >
        {children}
      </Box>
    </Box>
  );
};

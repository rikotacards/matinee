import { Skeleton, Stack } from "@mui/material";
import React from "react";

export const OverviewSkeleton: React.FC = () => {
  return (
    <Stack sx={{mt:1}} direction="column">
      <Skeleton variant="rounded" sx={{ width: "100%", mb: 1 }} />
      <Skeleton variant="rounded" sx={{ width: "100%", mb: 1 }} />
      <Skeleton variant="rounded" sx={{ width: "100%", mb: 1 }} />
      <Skeleton variant="rounded" sx={{ width: "100%" }} />
    </Stack>
  );
};

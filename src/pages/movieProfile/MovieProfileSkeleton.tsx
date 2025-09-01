import { Box, Skeleton, Stack } from "@mui/material";
import { movieProfileAvatar } from "../../components/commonStyles";

export const MovieProfileSkeleton: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Skeleton
          sx={{ mr: 2, height: movieProfileAvatar, width: movieProfileAvatar }}
          variant="circular"
        />
        <Stack direction="column">
          <Skeleton variant="text" />
          <Skeleton width={300} variant="text" />
        </Stack>
      </Box>
      <Stack sx={{ mt: 2, mb: 2 }} direction="row">
        <Skeleton
          sx={{ mr: 1, borderRadius: 10 }}
          width={100}
          height={40}
          variant="rounded"
        />
        <Skeleton
          sx={{ mr: 1, borderRadius: 10 }}
          width={100}
          height={40}
          variant="rounded"
        />
        <Skeleton
          sx={{ mr: 1, borderRadius: 10 }}
          width={100}
          height={40}
          variant="rounded"
        />
      </Stack>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton width={100} variant="text" />
    </Box>
  );
};

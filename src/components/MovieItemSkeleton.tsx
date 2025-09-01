import { Box, Skeleton } from "@mui/material"
import { movieItemAvatarSize } from "./commonStyles"

export const MovieItemSkeleton: React.FC = () => {
    return (
        <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb:2,
        }}
      >
        <Skeleton
          sx={{mr:1, height: movieItemAvatarSize, width: movieItemAvatarSize }}
          variant="circular"
        />
        <Skeleton sx={{mr:1}} width={200} variant="text" />
        <Skeleton width={50} variant="text"/>
      </Box>
    )
}
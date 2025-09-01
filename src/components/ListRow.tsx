import { Box, Card, Skeleton, Typography } from "@mui/material";
import React from "react";
interface ListPreviewProps {
  name: string;
  listId: string;
  onClick: () => void;
}
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useGetItemsByListId } from "../hooks/queries/useGetItemsByList";
export const ListRow: React.FC<ListPreviewProps> = ({
  listId,
  onClick,
  name,
}) => {
  const items = useGetItemsByListId(listId);
  const count = items.data?.length || 0;
  if (items.isLoading) {
    return (
      <Skeleton sx={{ mb: 1 }} variant="rectangular" width={300} height={52} />
    );
  }
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 2,
        minWidth: 300,
      }}
      component={Card}
      variant="outlined"
    >
      <Typography sx={{ mr: 1, textTransform: 'capitalize'}} >
        {name}
      </Typography>
      <Typography sx={{ ml: "auto" }} color="textSecondary">
        {count}
      </Typography>
      <KeyboardArrowRightIcon />
    </Box>
  );
};

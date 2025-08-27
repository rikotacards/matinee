import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useGetUserItems } from "../hooks/queries/useGetUserItems";
import { useAuth } from "../hooks/useAuth";
import { CustomItem } from "../components/CustomItem";
import { DialogWrapper } from "../components/DialogWrapper";
import { ItemDialog } from "../components/ItemDialog";
import { useNavigate } from "react-router";

export const AllFilms: React.FC = () => {
  const { session, user } = useAuth();
  const items = useGetUserItems(user?.id);
  const [id, setId] = React.useState<string | undefined>();
  const nav = useNavigate();
  if (items.isLoading) {
    return <CircularProgress />;
  }
  const onCloseRow = () => {
    setId(undefined);
  };
  const goToMovie = (itemId: string, movieRefId: string) => {
    console.log("movieref", movieRefId);
    const path = "/movies/" + itemId;
    const q = `?ratedBy=${user?.id}&item_id=${itemId}&movie_ref_id=${movieRefId}`;
    nav(path + q);
  };
  const selectedItem = items.data?.find((i) => i.id === id);
  const displayedItems = items.data?.map((i) => (
    <Box
      key={i.id}
      sx={{ mb: 2, cursor: "pointer" }}
      onClick={() => goToMovie(i.id, i.movie_ref_id)}
    >
      <CustomItem item={i} />
    </Box>
  ));
  if (!session) {
    return <Typography>Sign in to add films</Typography>;
  }
  if (!items.data?.length) {
    return <Typography>You have not added any films</Typography>;
  }
  return (
    <Box>
      <Box sx={{ mb: 1 }}>
        <Chip sx={{ mr: 1 }} label="List view" />
        <Chip label="Not rated" />
        <Chip label="Grid view" />
        <Chip label="Watch list" />
      </Box>
      {displayedItems}
      <DialogWrapper onClose={onCloseRow} title="Details" open={!!id}>
        {selectedItem && (
          <ItemDialog onClose={onCloseRow} item={selectedItem} />
        )}
      </DialogWrapper>
    </Box>
  );
};

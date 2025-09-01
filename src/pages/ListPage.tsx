import React from "react";
import { CustomList } from "../components/CustomList";
import { useGetListById } from "../hooks/queries/useGetListById";
import { useParams } from "react-router";
import { Box, CircularProgress, Typography } from "@mui/material";

export const ListPage: React.FC = () => {
  const params = useParams();
  const { list_id } = params;
  const list = useGetListById(list_id || "");

  if (list.isLoading) {
    return <CircularProgress />;
  }
  if (list.data?.is_public) {
    return (
      <Box sx={{ mb: 1 }}>
        <CustomList list={list.data} />
      </Box>
    );
  }
  return <Typography>List is private</Typography>;
};

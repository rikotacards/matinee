import React from "react";
import { CustomList } from "../components/CustomList";
import { useParams } from "react-router";
import {  Typography } from "@mui/material";

export const ListPage: React.FC = () => {
  const params = useParams();
  const { list_id } = params;

  if (!list_id) {
    return <Typography>List can't be found</Typography>;
  }
  return (
    <>
      <CustomList listId={list_id} />
    </>
  );
};

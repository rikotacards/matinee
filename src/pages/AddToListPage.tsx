import React from "react";
import { useGetLists } from "../hooks/queries/useGetLists";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { ListRow } from "../components/ListRow";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import { useAddItemToList } from "../hooks/mutations/useAddItemToList";
interface AddToListPageProps {
  itemId: string;
}
export const AddToListPage: React.FC<AddToListPageProps> = ({
  itemId,
}) => {
  const { user } = useAuth();

  const nav = useNavigate();
  const addToList = useAddItemToList();
  const back = () => {
    nav(-1);
  };
  const onAddItemToList = (listId: string) => {
    addToList.mutate({ item_id: itemId, list_id: listId });
  };
  const lists = useGetLists(user?.id);
  if (lists.isLoading) {
    return <CircularProgress />;
  }

  const displayedLists = lists.data?.map((l) => (
    <ListRow onClick={() => onAddItemToList(l.id)} listId={l.id} name={l.name} />
  ));
  return (
    <Box>
      <Box>
        <IconButton onClick={back}>
          <ArrowBackIosNew />
        </IconButton>
      </Box>
      <Button>Create New List</Button>
      {displayedLists}
    </Box>
  );
};

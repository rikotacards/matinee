import React from "react";
import {
  useGetUserItems,
  type UserItem,
} from "../hooks/queries/useGetUserItems";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router";
import { MovieItem } from "../components/MovieItem";
import { MovieItemSkeleton } from "../components/MovieItemSkeleton";
import { useDeleteUserItem } from "../hooks/mutations/useDeleteUserItem";
import { Close } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useDialogControl } from "../hooks/useDialogControl";
interface AllFilmsItems {
  userId: string;
  showMoreOptions?: boolean;
}
type FilteredItems = {
  all: UserItem[];
  notrated: UserItem[];
  rated: UserItem[];
};
const loadingSkeletons = [1, 1, 1, 1, 1, 1, 1, 1];
interface MoreOptionsWrapperProps {
  children: React.ReactNode;
  itemId: number | string;
  showMoreOptions?: boolean;
}
type SortMap = {
  highest: (a: UserItem, b: UserItem) => number;
  lowest: (a: UserItem, b: UserItem) => number;
  earliest: (a: UserItem, b: UserItem) => number;
  latest: (a: UserItem, b: UserItem) => number;
};
const MoreOptionsWrapper: React.FC<MoreOptionsWrapperProps> = ({
  children,
  itemId,
  showMoreOptions,
}) => {
  const remove = useDeleteUserItem();
  const removeIcon = remove.isPending ? (
    <CircularProgress color="error" size={20} />
  ) : (
    <IconButton onClick={() => remove.mutate(itemId)}>
      <Close color="error" fontSize="small" />
    </IconButton>
  );
  return (
    <>
      <Box
        sx={{
          pb:1, 
          pt:1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mr: "auto",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            flexDirection: "row",
            alignItems: "center",
            display: "flex",
            ml: "auto",
          }}
        >
          {showMoreOptions ? removeIcon : null}
        </Box>
      </Box>
      {showMoreOptions && <Divider sx={{ width: "100%", mb: 1 }} />}
    </>
  );
};
export const AllFilmsItems: React.FC<AllFilmsItems> = ({
  showMoreOptions,
  userId,
}) => {
  const sortFnLowest = (a: UserItem, b: UserItem) =>
    (a.rating || 0) - (b.rating || 0);
  const sortFnHighest = (a: UserItem, b: UserItem) =>
    (b.rating || 0) - (a.rating || 0);
  const sortFnEarliest = (a: UserItem, b: UserItem) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  const sortFnLatest = (a: UserItem, b: UserItem) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  const sortMap: SortMap = {
    highest: sortFnHighest,
    lowest: sortFnLowest,
    earliest: sortFnEarliest,
    latest: sortFnLatest,
  };
  const items = useGetUserItems(userId);
  const [sortMethod, setSortMethod] = React.useState<keyof SortMap>("latest");
  const { name, setDialogName, onCloseDialog } = useDialogControl();
  const [filterName, setFilter] = React.useState("all");
  const notRatedItems = items.data?.filter((i) => !i.rating);
  const ratedItems = items.data?.filter((i) => !!i.rating);
  const nav = useNavigate();
  if (items.isLoading) {
    return (
      <>
        {loadingSkeletons.map((_, i) => (
          <MovieItemSkeleton key={i} />
        ))}
      </>
    );
  }

  const goToMovie = (movieRefId: string | number) => {
    const path = "/movies/" + movieRefId;
    const q = `?ratedBy=${userId}`;
    nav(path + q);
  };
  const onSetSort = (sort: keyof SortMap) => {
    setSortMethod(sort);
    onCloseDialog();
  };
  const itemsByFilter: FilteredItems = {
    all: items.data || [],
    notrated: notRatedItems || [],
    rated: ratedItems || [],
  };
  const sorted = itemsByFilter[filterName as keyof FilteredItems].sort(
    sortMap[sortMethod]
  );
  const displayedItems = sorted.map((i) => (
    <MoreOptionsWrapper
      key={i.id}
      showMoreOptions={showMoreOptions}
      itemId={i.id}
    >
      <Box
        sx={{ width: "100%", cursor: "pointer" }}
        onClick={() => goToMovie(i.movie_ref_id)}
      >
        <MovieItem item={i} />
      </Box>
    </MoreOptionsWrapper>
  ));
  if (items.data?.length === 0) {
    return <Typography>You have not added any films.</Typography>;
  }
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          mt: 1,
          mb: 2,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Chip
          onClick={() => setFilter("all")}
          variant={filterName === "all" ? "filled" : "outlined"}
          sx={{ mr: 1 }}
          label="All"
        />
        <Chip
          onClick={() => setFilter("rated")}
          variant={filterName === "rated" ? "filled" : "outlined"}
          sx={{ mr: 1 }}
          label="Rated"
        />
        <Chip
          onClick={() => setFilter("notrated")}
          variant={filterName === "notrated" ? "filled" : "outlined"}
          sx={{ mr: 1 }}
          label="Not rated"
        />
        <IconButton sx={{ ml: 'auto' }} onClick={() => setDialogName("sort")}>
          <SwapVertIcon />
        </IconButton>
      </Box>
      {displayedItems}
      <Drawer anchor="bottom" open={name === "sort"} onClose={onCloseDialog}>
        <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
          <Button
            sx={{ mt: 0.5, mb: 0.5 }}
            variant={sortMethod === "latest" ? "contained" : "outlined"}
            onClick={() => onSetSort("latest")}
          >
            Sort by latest date added
          </Button>
          <Button
            sx={{ mt: 0.5, mb: 0.5 }}
            variant={sortMethod === "earliest" ? "contained" : "outlined"}
            onClick={() => onSetSort("earliest")}
          >
            Sorty by earliest date added
          </Button>
          <Button
            sx={{ mb: 0.5 }}
            variant={sortMethod === "highest" ? "contained" : "outlined"}
            onClick={() => onSetSort("highest")}
            startIcon={<ArrowUpwardIcon />}
          >
            Sort by highest rating
          </Button>
          <Button
            sx={{ mt: 0.5, mb: 0.5 }}
            variant={sortMethod === "lowest" ? "contained" : "outlined"}
            onClick={() => onSetSort("lowest")}
            startIcon={<ArrowDownwardIcon />}
          >
            Sort by lowest rating
          </Button>

          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            size="large"
            onClick={onCloseDialog}
          >
            Cancel
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

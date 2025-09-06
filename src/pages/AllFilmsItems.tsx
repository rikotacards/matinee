import React from "react";
import { useGetUserItems } from "../hooks/queries/useGetUserItems";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { MovieItem } from "../components/MovieItem";
import { MovieItemSkeleton } from "../components/MovieItemSkeleton";
import { useDeleteUserItem } from "../hooks/mutations/useDeleteUserItem";
import { Close } from "@mui/icons-material";
interface AllFilmsItems {
  userId: string;
  showMoreOptions?: boolean;
}
const loadingSkeletons = [1, 1, 1, 1, 1, 1, 1, 1];
interface MoreOptionsWrapperProps {
  children: React.ReactNode;
  itemId: number | string;
  showMoreOptions?: boolean;
}
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
          p: 1,
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
  const items = useGetUserItems(userId);
  
  const [filterName, setFilter] = React.useState("all");
  const notRatedItems = items.data?.filter((i) => !i.rating )
  const ratedItems = items.data?.filter((i) => !!i.rating)
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
  const goToWatchlist = () => {
    nav('/watchlist')
  }
  const goToMovie = (movieRefId: string | number) => {
    const path = "/movies/" + movieRefId + "/true";
    const q = `?ratedBy=${userId}`;
    nav(path + q);
  };
  const itemsByFilter = {
    'all': items.data,
    'notrated': notRatedItems,
    'rated': ratedItems
  }
  //@ts-expect-error todo this
  const displayedItems = itemsByFilter[filterName].map((i) => (
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
    return <Typography>You have not added any films</Typography>;
  }
  return (
    <>
      <Box sx={{ mt: 1, mb: 2, display: "flex", flexDirection: "row" }}>
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
        <Chip onClick={goToWatchlist} variant='outlined' label="Watchlist" />
      </Box>
      {displayedItems}
    </>
  );
};

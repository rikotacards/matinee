import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import type { Item } from "../types/supabaseTypes";
import { useDeleteItem } from "../hooks/mutations/useDeleteItem";
import { DialogWrapper } from "./DialogWrapper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AddItemForm } from "./AddItemForm";
import { RatingDisplay } from "./RatingDisplay";
import { useGetExternalMovieDetailsById } from "../hooks/queries/useGetMovieById";
import { getImage } from "../utils/getImage";
import { Add, ArrowRight, Check, Delete, MoreVert } from "@mui/icons-material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface ItemDetailsProps {
  item: UserItem;
  onClose: () => void;
  rating: number;
  title: string;
  listId?: string;
  edit?: () => void;
  addToList: () => void;
  movieOverview?: string;
  hasWatched?: boolean;
  poster_path?: string;
  release: string;
}
import CircleIcon from "@mui/icons-material/Circle";
import type { UserItem } from "../hooks/queries/useGetUserItems";
export const ItemDetails: React.FC<ItemDetailsProps> = ({
  listId,
  onClose,
  item,
  edit,
  addToList,
  title,
  rating,
  movieOverview,
  hasWatched,
  poster_path,
  release,
}) => {
  
  const deleteItem = useDeleteItem()
  const onDelete = () => {
    deleteItem.mutate(item.id, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ mr: 2, height: 150, width: 150 }}
            src={poster_path ? getImage(poster_path) : undefined}
            alt={title}
          />
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="h5" fontWeight="bold">
              {title}
            </Typography>
            <Typography sx={{ mt: 1 }} variant="caption" color="textSecondary">
              Release date
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {release
                ? new Date(release).toDateString()
                : null}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            mr: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            onClick={edit}
            sx={{ p: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="caption" color="textSecondary">
              Your rating
            </Typography>
            {rating ? (
              <RatingDisplay textVariant="body2" rating={rating} />
            ) : (
              <Typography variant="body2">Add rating</Typography>
            )}
          </Box>
          {/* <MoreVert color='disabled' fontSize="small" /> */}
        </Box>
        <Box
          onClick={edit}
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
            <Typography variant="caption" color="textSecondary">
              Watched
            </Typography>

            {hasWatched && !item.last_watched_date && (
              <Box>
                <Typography variant="body2">Yes - Add date</Typography>
              </Box>
            )}
            {hasWatched && item.last_watched_date && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">{hasWatched}</Typography>
                <Check fontSize="small" color="success" />
              </Box>
            )}
            {!hasWatched && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircleIcon
                  sx={{ mr: 0, scale: 0.5 }}
                  fontSize="small"
                  color="error"
                />
                <Typography variant="body2">Not yet</Typography>
              </Box>
            )}
          </Box>
          {/* <MoreVert fontSize="small" /> */}
        </Box>
        <Button
          onClick={() => {
            addToList();
          }}
          sx={{
            ml: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Add color="inherit" fontSize="small" />
          <Typography color="textSecondary" variant="caption">
            Add to list
          </Typography>
        </Button>
        <Button
          onClick={() => {
            onDelete();
          }}
          sx={{
            ml: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Delete color="error" fontSize="small" />
          <Typography  color="error" variant="caption">
            Delete
          </Typography>
        </Button>
      </Box>

      <Box>
        <Typography>{movieOverview}</Typography>
      </Box>
    </Box>
  );
};

import { Stack } from "@mui/material";
import React from "react";
import { MovieItemSkeleton } from "../components/MovieItemSkeleton";
interface MovieSkeletonList {
  rows?: number;
}
export const MovieItemSkeletonList: React.FC<MovieSkeletonList> = ({rows}) => {
  const res = [];
  for (let i = 0; i < (rows || 1); i++) {
    res.push(<MovieItemSkeleton />);
  }
  return <Stack direction="column">{res}</Stack>;
};

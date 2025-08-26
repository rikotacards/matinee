import { ArrowBackIosNew } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useGetMovieRef } from "../hooks/queries/useGetMovieRef";
import { getImage } from "../utils/getImage";
import { useGetExternalMovieDetailsById } from "../hooks/queries/useGetMovieById";

export const MovieProfile: React.FC = () => {
  const q = useParams();
  console.log("q", q);
  const movie_ref_id = q.movie_id;
  const movie_ref = useGetMovieRef(movie_ref_id);
  const externalDetails = useGetExternalMovieDetailsById(movie_ref.data?.external_id)
  const poster_path = getImage(movie_ref.data?.poster_path);

  const [searchParams] = useSearchParams();
  console.log("p", searchParams.get("ratedBy"));
  const ratedBy = searchParams.get("ratedBy");
  const nav = useNavigate();
  if(movie_ref.isLoading || externalDetails.isLoading){
    return <CircularProgress/>
  }
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => nav(-1)}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography>{movie_ref.data?.title}</Typography>
      </Box>
      <Box>
        <Box sx={{display:'flex'}}>
          <Avatar sx={{ height: 80, width: 80 }} src={poster_path} />
          <Stack direction='column'>

          <Typography>Release</Typography>
          <Typography>{movie_ref.data.release}</Typography>
          </Stack>
        </Box>
      </Box>
      <Box>
        <Typography>Overview</Typography>
        <Typography>{externalDetails.data?.overview}</Typography>
      </Box>
      <Box sx={{p:1}}>
      review by {ratedBy}
        </Box>
      <Divider />
      <Box>
        <Typography>Have you seen this?</Typography>
        <Button>Save to collection</Button>
        <Button>Add to watch list</Button>
        <Button>Add to list</Button>
      </Box>
    </Box>
  );
};

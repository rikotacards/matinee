import React from "react";
import { useGetRating } from "../../hooks/queries/useGetRating";
import { Box } from "@mui/material";
import { RatingRow } from "./RatingRow";
import { useAuth } from "../../hooks/useAuth";
interface AllRatingsProps {
  ratedBy?: string;
  movie_ref_id_url: number | string;
  isInternal: boolean;
}
export const AllRatings: React.FC<AllRatingsProps> = ({
  ratedBy,
  movie_ref_id_url,
  isInternal,
}) => {
  const { user } = useAuth();
  const username = user?.identities?.[0]?.identity_data?.name;
  const otherPersonRating = useGetRating({
    user_id: ratedBy,
    movie_ref_id: movie_ref_id_url,
  });
  const myRating = useGetRating({
    user_id: user?.id,
    movie_ref_id: movie_ref_id_url,
  });
  return (
    <Box sx={{ mt: 1 }}>
      {ratedBy && ratedBy !== user?.id && otherPersonRating.data && (
        <RatingRow
          userId={ratedBy}
          isOwner={false}
          isInternal={isInternal}
          movie_ref_id={movie_ref_id_url}
          rating={otherPersonRating.data?.rating || 0}
        />
      )}
      {!!myRating.data && (
        <RatingRow
          isOwner
          isInternal={isInternal}
          userId={username}
          movie_ref_id={movie_ref_id_url}
          rating={myRating.data?.rating || 0}
        />
      )}
      <RatingRow
        isInternal={isInternal}
        userId={"Someoneelse124"}
        movie_ref_id={movie_ref_id_url}
        rating={5}
      />
      <RatingRow
        isInternal={isInternal}
        userId={"jasonwuu"}
        movie_ref_id={movie_ref_id_url}
        rating={5}
      />
    </Box>
  );
};

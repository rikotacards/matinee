import React from "react";
import { useGetRating } from "../../hooks/queries/useGetRating";
import { Box } from "@mui/material";
import { RatingRow } from "./RatingRow";
import { useAuth } from "../../hooks/useAuth";
interface AllRatingsProps {
  ratedBy?: string | null;
  movie_ref_id_url?: string
}
export const AllRatings: React.FC<AllRatingsProps> = ({
  ratedBy,
  movie_ref_id_url,
}) => {
  const { user } = useAuth();
  console.log('user', user)
  const username = user?.identities?.[0]?.identity_data?.name
  const otherPersonRating = useGetRating({
    user_id: ratedBy,
    movie_ref_id: movie_ref_id_url || "",
  });
  const myRating = useGetRating({
    user_id: user?.id || "",
    movie_ref_id: movie_ref_id_url || "",
  });
  return (
    <Box>
      {ratedBy !== user?.id && otherPersonRating && (
        <RatingRow rating={otherPersonRating.data?.rating || 0} />
      )}
      {myRating.data && <RatingRow userId={username} rating={myRating.data?.rating || 0} />}
      <RatingRow userId={'MichaelHsu95'} rating={3} />
            <RatingRow userId={'AlbertHsie'} rating={3} />

    </Box>
  );
};

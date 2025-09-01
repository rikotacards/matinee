import React from "react";
import { SearchForm } from "./SearchForm";
import { DetailsInputForm } from "./DetailsInputForm";
import { DialogWrapper } from "./DialogWrapper";
import type { Movie } from "../hooks/queries/useGetExternalMovieDetailsById";
import { useAddItem } from "../hooks/mutations/useAddItem";
import { useAuth } from "../hooks/useAuth";
import { useAddItemToList } from "../hooks/mutations/useAddItemToList";
import { Button } from "@mui/material";
import { useGetItemByApiAndUser } from "../hooks/queries/useGetMyItemsById";
import { useUpsertMovieRef } from "../hooks/mutations/useUpsertMovieRef";
import { useUpsertUserItem } from "../hooks/mutations/useUpsertUserItem";
import { useUpsertRating } from "../hooks/mutations/useUpsertRating";
interface AddItemFormNewProps {
  onClose: () => void;
  list_id?: string;
  fullScreen;
}
export const AddItemFormNew: React.FC<AddItemFormNewProps> = ({
  list_id,
  onClose,
  fullScreen,
}) => {
  const [step, setStep] = React.useState(0);
  const addToList = useAddItemToList();
  const { user } = useAuth();
  const upsertUserItem = useUpsertUserItem();
  const upsertRating = useUpsertRating();
  const [movie, setMovie] = React.useState<Movie | undefined>();
  const onSelect = (movie: Movie) => {
    setMovie(movie);
    setStep(1);
  };
  const [rating, setRating] = React.useState(0);
  const [watchedDate, setWatchedDate] = React.useState<string | null>(null);
  const [hasWatched, setHasWatched] = React.useState(true);
  const setWatched = (has: boolean) => {
    setHasWatched(has);
  };
  const upsertMovieRef = useUpsertMovieRef();
  const onRatingChange = (r: number) => {
    setRating(r);
  };
  const onWatchedDateChange = (d: string) => {
    setWatchedDate(d);
  };
  const onAdd = async () => {
    if (!movie || !user) {
      return;
    }

    const movie_ref_id = await upsertMovieRef.mutateAsync({
      source: "TMBD",
      external_id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title,
      release: movie.release_date,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview
    });
    if (rating) {
      await upsertRating.mutate({ rating, user_id: user.id, movie_ref_id });
    }

    await upsertUserItem.mutate({
      movie_ref_id,
      status: hasWatched ? "watched" : "want",
      user_id: user.id,
    });
    onClose();
  };
  return (
    <DialogWrapper
      onBack={step > 0 ? () => setStep((p) => p - 1) : undefined}
      title="Add movie"
      open
      fullScreen={fullScreen}
      onClose={onClose}
    >
      {step == 0 && <SearchForm onSelect={onSelect} />}
      {movie && step === 1 && (
        <>
          <DetailsInputForm
            onRatingChange={onRatingChange}
            setWatched={setWatched}
            rating={rating}
            hasWatched={hasWatched}
            watchedDate={watchedDate}
            onWatchedDateChange={onWatchedDateChange}
            movie={movie}
          />

          <Button variant="contained" sx={{ m: 1 }} onClick={onAdd}>
            Add
          </Button>
        </>
      )}
    </DialogWrapper>
  );
};

import { useGetExternalMovieDetailsById } from "../../hooks/queries/useGetExternalMovieDetailsById";
import { useGetMovieRef } from "../../hooks/queries/useGetMovieRef";

export const useMovieDetails = (movieId: string | number) => {
    console.log('getting movie detials with', movieId)
    const external = useGetExternalMovieDetailsById(movieId)
    const internal = useGetMovieRef({
        id: movieId,
      });
    if(internal.data){
        console.log('returning internal')
        return internal.data
    }
    console.log('ex', external.data)
    return {...external.data, release: external.data?.release_date}
}
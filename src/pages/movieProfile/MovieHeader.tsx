import React from 'react';
import { useGetMovieRef } from '../../hooks/queries/useGetMovieRef';
import { MovieProfileHeaderExternalWrapper } from './MovieProfileHeaderExternalWrapper';
import { MovieProfileHeader } from './MovieProfileHeader';
import { getImage } from '../../utils/getImage';
interface MovieHeaderProps {
    movieId: string;
}
export const MovieHeader: React.FC<MovieHeaderProps> = ({movieId}) => {
    const internalMovieRef = useGetMovieRef({id: movieId})
    if(!internalMovieRef.data){
        return <MovieProfileHeaderExternalWrapper externalId={movieId}/>
    }
      const fullPoster = getImage(internalMovieRef.data.poster_path);
    
    return <MovieProfileHeader 
    poster_path={fullPoster}
    release={internalMovieRef.data.release}
    title={internalMovieRef.data.title}
    movieId={'1'}
    
    />
}
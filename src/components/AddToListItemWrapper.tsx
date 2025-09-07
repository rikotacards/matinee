import { Box } from '@mui/material';
import React from 'react';
import { useAddToListByMovieId } from '../hooks/useAddToListByMovieId';
import { Add } from '@mui/icons-material';
interface AddToListItemWrapperProps {
    children: React.ReactNode;
    movieId: string | number;
    isInternal: boolean;
    onClose: () => void;
    listId?: string | number;
}
export const AddToListItemWrapper:React.FC<AddToListItemWrapperProps> = ({onClose, listId, movieId, children}) => {
    const addToList = useAddToListByMovieId(movieId);
    const onClick = async() => {
        if(!listId){
            throw new Error('no list provided')
        }
        await addToList(listId)
        onClose();
    }
    return (

        <Box sx={{width:'100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}} onClick={() => onClick()}>
            {children}
            <Add sx={{ml:'auto'}}/>
        </Box>
    )
}
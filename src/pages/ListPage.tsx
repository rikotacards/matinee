import React from 'react';
import { CustomList } from '../components/CustomList';
import { useGetListById } from '../hooks/queries/getListById';
import { useParams } from 'react-router';
import { CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export const ListPage: React.FC = () => {
    const params = useParams();
    const list = useGetListById(params.list_id|| "");
    const {user} = useAuth();
    const isOwner = user?.id === list.data?.user_id
    if(list.isLoading){
        return <CircularProgress/>
    }
    if(list.data?.is_public){
        return  <CustomList owner='max' isOwner={isOwner} name={list.data.name}/>
    }
    return (

        <Typography>List is private</Typography>
    )
}
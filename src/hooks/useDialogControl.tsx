import React from 'react';

export const useDialogControl = () => {
    const [name, setName] = React.useState('')
    const onCloseDialog = () => {
        setName('')
    }
    const setDialogName = (name: string) =>{
        setName(name)
    }
    return {name, onCloseDialog, setDialogName}
}
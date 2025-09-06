import { useCheckAndPopulateUserItem } from "./useCheckAndPopulate"
import { useUpsertWatchlistItem } from "./useUpsertWatchlistItem";

export const useAddToWatchlist = (movieId: string | number, isInternal: boolean) => {
    const check = useCheckAndPopulateUserItem(movieId, isInternal); 
    const add = useUpsertWatchlistItem()
    return async() => {
        const item = await check()
        if(!item){
            return;
        }
        add.mutateAsync({
            item_id: item.id,
            movie_ref_id: item.movie_ref_id, 
            user_id: item.user_id
        })
    }
}
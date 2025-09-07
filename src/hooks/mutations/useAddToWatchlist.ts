import { useGetCheckAndPopulate } from "./useGetCheckAndPopulate";
import { useUpsertWatchlistItem } from "./useUpsertWatchlistItem";

export const useAddToWatchlist = (movieId: string | number) => {
    const check = useGetCheckAndPopulate(movieId); 
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
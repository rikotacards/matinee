import { useCheckAndPopulateNew } from "./useCheckAndPopulateNew";
import { useUpsertWatchlistItem } from "./useUpsertWatchlistItem";

export const useGetAddToWatchlist = (movieId:string | number) => {
    const check = useCheckAndPopulateNew(movieId); 
    const add = useUpsertWatchlistItem()
    return  async() => {
        const item = await check()
        if(!item){
            throw new Error('Cant add to watchlist')
        }
        add.mutateAsync({
            item_id: item.id,
            movie_ref_id: item.movie_ref_id, 
            user_id: item.user_id
        })
    }
}
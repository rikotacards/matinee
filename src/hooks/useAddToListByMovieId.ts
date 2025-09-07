import { useAddItemToList } from "./mutations/useAddItemToList";
import { useGetCheckAndPopulate } from "./mutations/useGetCheckAndPopulate";

export const useAddToListByMovieId = (movieId: string | number) => {
  const check = useGetCheckAndPopulate(movieId);
  const addItemToList = useAddItemToList();
  return async (listId: string | number) => {
    const item = await check();
    if (!item) {
      return;
    }
    addItemToList.mutate({
      list_id: listId,
      item_id: item.id,
    });
  };
};

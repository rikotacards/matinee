import { useAddItemToList } from "./mutations/useAddItemToList";
import { useCheckAndPopulateUserItem } from "./mutations/useCheckAndPopulate";

export const useAddToListByMovieId = (movieId: string, isInternal: boolean) => {
  const check = useCheckAndPopulateUserItem(movieId, isInternal);
  const addItem = useAddItemToList();
  return async (listId: string) => {
    const item = await check();
    if (!item) {
      return;
    }
    addItem.mutate({
      list_id: listId,
      item_id: item.id,
    });
  };
};

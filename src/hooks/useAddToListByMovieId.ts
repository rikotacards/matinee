import { useAddItemToList } from "./mutations/useAddItemToList";
import { useCheckAndPopulateNew } from "./mutations/useCheckAndPopulateNew";

export const useAddToListByMovieId = (movieId: string | number, isInternal: boolean) => {
  const check = useCheckAndPopulateNew(movieId);
  const addItem = useAddItemToList();
  return async (listId: string | number) => {
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

import { useSnackbar } from "notistack";

export const useGetCopy = () => {
  const { enqueueSnackbar } = useSnackbar();
  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    enqueueSnackbar({ message: "Copied movie url", variant: "success" });
  };
  return copy;
};

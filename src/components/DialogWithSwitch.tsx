import { Dialog, Drawer } from "@mui/material";
interface DialogWithSwitchProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  fullScreen?: boolean;
  isSmall?: boolean;
}
export const DialogWithSwitch: React.FC<DialogWithSwitchProps> = ({
  children,
  onClose,
  fullScreen,
  open,
  isSmall
}) => {
  if (isSmall) {
    return <Drawer
    onClose={onClose}
    open={open}
    anchor="bottom"
    >{children}</Drawer>;
  }
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};

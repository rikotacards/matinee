import { Box, Card, Skeleton } from "@mui/material";
interface ListRowSkeletonProps {
  disablePb?: boolean;
}
export const ListRowSkeleton: React.FC<ListRowSkeletonProps> = ({disablePb}) => {
  return (
    <Box component={Card} variant="outlined" sx={{mb: disablePb ? 0 : 1, height:52,  p: 2, width:'100%' }}>
      <Skeleton  variant="rectangular" width={100}  />
    </Box>
  );
};

import { useMediaQuery, useTheme } from '@mui/material';

/**
 * Custom hook to determine if the viewport is smaller than the 'sm' (small) breakpoint.
 *
 * @returns {boolean} `true` if the viewport width is less than the 'sm' breakpoint, `false` otherwise.
 */
export const useIsSmall = () => {
  const theme = useTheme();
  // useMediaQuery('(min-width:600px)') checks if the screen is 600px or wider (i.e., 'sm' or larger).
  // We want to know if it's *smaller* than 'sm', so we negate the result.
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));

  return isSmallScreen;
};

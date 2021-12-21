import { m } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, IconButton, IconButtonProps } from '@mui/material';

// ----------------------------------------------------------------------

const VoteButtonAnimate = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, size = 'medium', ...other }, ref) => (
    <AnimateWrap size={size}>
      <IconButton size={size} disableRipple={true}  ref={ref} {...other} >
        {children}
      </IconButton>
    </AnimateWrap>
  )
);

export default VoteButtonAnimate;

// ----------------------------------------------------------------------

type AnimateWrapProp = {
  children: ReactNode;
  size: 'small' | 'medium' | 'large';
};

const varSmall = {
  hover: { scale: 1.3 },
  tap: { scale: 0.8 },
};

const varMedium = {
  hover: { scale: 1.3 },
  tap: { scale: 0.8 },
};

const varLarge = {
  hover: { scale: 1.3 },
  tap: { scale: 0.8 },
};

function AnimateWrap({ size, children }: AnimateWrapProp) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex',
      }}
    >
      {children}
    </Box>
  );
}

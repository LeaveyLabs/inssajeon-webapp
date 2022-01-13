import { m } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material';

// ----------------------------------------------------------------------

const VoteIconButton = styled(IconButton)(({ theme }) => ({
  '&.Mui-disabled':	{
    color: theme.palette.grey[600],
  },
}));

const VoteButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, size = 'medium', ...other }, ref) => (
    <AnimateWrap size={size}>
      <VoteIconButton size={size} disableRipple={true}  ref={ref} {...other} >
        {children}
      </VoteIconButton>
    </AnimateWrap>
  )
);

export default VoteButton;

// ----------------------------------------------------------------------

type AnimateWrapProp = {
  children: ReactNode;
  size: 'small' | 'medium' | 'large';
};

const varSmall = {
  //hover: { scale: 1.3 },
  tap: { scale: 0.7 },
};

const varMedium = {
  //hover: { scale: 1.3 },
  tap: { scale: 0.7 },
};

const varLarge = {
  //hover: { scale: 1.3 },
  tap: { scale: 0.7 },
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

// @mui
import { IconButton, IconButtonProps, styled } from '@mui/material';
// ----------------------------------------------------------------------
import React, { forwardRef } from 'react';


const Bootin = styled(IconButton)(({ theme }) => ({
  '&.Mui-disabled':	{
    color: theme.palette.grey[600], //this is the same color for IconButton set in theme/overrides
  },
  '&.MuiButtonBase-root:disabled': { //so cursors stays a pointer when disabled
    pointerEvents: 'auto',
    cursor: 'pointer',
  },
}));

const UnstyledWhenDisabledIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, size = 'medium', ...other }, ref) => (
      <Bootin size={size} ref={ref} {...other} >
        {children}
      </Bootin>
  )
);

export default UnstyledWhenDisabledIconButton;
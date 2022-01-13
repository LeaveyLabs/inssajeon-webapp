import CloseIcon from '@mui/icons-material/Close';
import { SxProps } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

interface Props {
  errorMessage: any;
  onClose?: VoidFunction;
  sx?: SxProps;
}

export default function TransitionAlert( {errorMessage, onClose, sx} : Props ) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: 'auto', ...sx }}>
      <Collapse in={open}>
        <Alert
          severity='error'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                setTimeout (() => {
                  if (onClose) onClose();
                }, 1000)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {errorMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}

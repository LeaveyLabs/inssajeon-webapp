import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function IconButton(theme: Theme) {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[600],
        },        
      }
    }
  };
}

import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Backdrop(theme: Theme) {

  return {
    MuiBackdrop: {
      styleOverrides: {
        // root: { 
        //   background: [

        //   ],
        //   '&.MuiBackdrop-invisible': {

        //   }
        // }
      }
    }
  };
}

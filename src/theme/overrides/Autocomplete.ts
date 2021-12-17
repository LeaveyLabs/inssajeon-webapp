import { Theme, alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Autocomplete(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const boxShadow = `0 0 2px 0 ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.2
  )}, ${theme.customShadows.z20}`;

  return {
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          minWidth: 260,
          maxWidth: 260,
        },
        paper: {
          boxShadow,
        },
        listbox: {
          padding: theme.spacing(0, 1),
          '& .MuiAutocomplete-option': {
            padding: theme.spacing(1),
            margin: theme.spacing(1, 0),
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}

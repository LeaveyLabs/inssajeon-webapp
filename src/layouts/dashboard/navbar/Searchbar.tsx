import { useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
// utils
import cssStyles from '../../../utils/cssStyles';
// components

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { borderColor, palette } from '@mui/system';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.2),
  zIndex:3,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative', //so SearchIconWrapper can be placed absolutely within
  height: 'auto',
  maxWidth:'100%',
  borderRadius:10,
  zIndex:2,
  [theme.breakpoints.down('desktop')]: {
    backgroundColor: 'transparent',
    marginRight: theme.spacing(7.5),
    borderRadius: 100,
    width: '4.7ch',
  },
  [theme.breakpoints.up('desktop')]: {
    marginRight: theme.spacing(9),
    backgroundColor: theme.palette.grey[200],
    borderRadius: 10,
    width: '11ch',
  },
  transition: theme.transitions.create([
    "border-color",
    "background-color",
    "box-shadow",
    'width',
    'margin-right',
  ]),
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  "&:focus-within": {
    backgroundColor: theme.palette.grey[200],
    width: '60ch',
    marginRight: 0,
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 3px`,
    borderColor: theme.palette.primary.main,
  }
}));

const StyledInputBase = styled(InputBase)(({ theme  }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    height:'3ch',
  },
}));

export default function Searchbar(  ) {
  let theme = useTheme()
  let [isFocused, setIsFocused] = useState(false);

  let handleFocus = () => {
    setIsFocused(true);
  }

  let handleBlur = () => {
    setIsFocused(false);
  }

  return (
    <Search >
      <SearchIconWrapper>
        <SearchIcon fontSize='large' color='primary'  />
      </SearchIconWrapper>
      <StyledInputBase type='search' onBlur={handleBlur} onFocus={handleFocus} placeholder="겸색..." fullWidth id='search-input' />
    </Search>
  );
}


//ANOTHER INPUTBASE TO REFERENCE LATER ON FOR MORE BEAUTIFICATION:

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   "& .MuiInputBase-input": {
//     borderRadius: 4,
//     position: 'relative',
//     zIndex:2,
//     width: '6ch',
//     height:'3ch',
//     maxWidth:'100%',
//     marginRight: theme.spacing(7.5),
//     [theme.breakpoints.up('desktop')]: {
//       marginRight: theme.spacing(0)
//     },
//     backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "10px 12px",
//     transition: theme.transitions.create([
//       "border-color",
//       "box-shadow",
//       'width',
//       'margin-right',
//     ]),
//     '&:hover': {
//       backgroundColor: theme.palette.grey[200],
//     },
//     "&:focus": {
//       backgroundColor: theme.palette.grey[200],
//       width: '80ch',
//       marginRight: 0,
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//       borderColor: theme.palette.primary.main,
//     }
//   }
// }));

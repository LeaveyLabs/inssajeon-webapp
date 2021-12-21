import { useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

// utils
import cssStyles from '../../../utils/cssStyles';
// components

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { borderColor } from '@mui/system';

// ----------------------------------------------------------------------

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(1),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme  }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    borderRadius: theme.shape.borderRadius,
    border: 5,
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
    [theme.breakpoints.up('mobile')]: {
      width: '5ch',
      '&:focus': {
        width: '12ch',
      },
    },
    [theme.breakpoints.up('tablet')]: {
      width: '10ch',
      '&:focus': {
        width: '25ch',
      },
    },
    [theme.breakpoints.up('desktop')]: {
      width: '20ch',
      '&:focus': {
        width: '350ch',
      },
    },
    
  },
}));

// type SearchbarProps = {
//   handleFocus: VoidFunction;
// };

export default function Searchbar(  ) {
  const theme = useTheme();

  return (
    // <ClickAwayListener onClickAway={handleToggleFocus}>
      <Search >
        <SearchIconWrapper>
          <SearchIcon color='primary' />
        </SearchIconWrapper>
        <StyledInputBase  placeholder="겸색..." inputProps={{ 'aria-label': 'search' }} />
      </Search>
    // </ClickAwayListener>
  );
}

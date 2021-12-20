import { useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, InputAdornment, ClickAwayListener } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// components
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButtonAnimate } from '../../../components/animate';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


// ----------------------------------------------------------------------

// const APPBAR_MOBILE = 64;
// const APPBAR_DESKTOP = 92;

// const SearchbarStyle = styled('div')(({ theme }) => ({
//   ...cssStyles(theme).bgBlur(),
//   top: 0,
//   left: 0,
//   zIndex: 99,
//   width: '100%',
//   display: 'flex',
//   position: 'absolute',
//   alignItems: 'center',
//   height: APPBAR_MOBILE,
//   padding: theme.spacing(0, 3),
//   boxShadow: theme.customShadows.z8,
//   [theme.breakpoints.up('desktop')]: {
//     height: APPBAR_DESKTOP,
//     padding: theme.spacing(0, 5),
//   },
// }));

// ----------------------------------------------------------------------

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('tablet')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('tablet')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function Searchbar() {
  // const [isOpen, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen((prev) => !prev);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
    
    
    
    // <ClickAwayListener onClickAway={handleClose}>
    //   <div>
    //     {!isOpen && (
    //       <IconButtonAnimate onClick={handleOpen}>
    //         <SearchRoundedIcon fontSize="large"/>
    //       </IconButtonAnimate>
    //     )}

    //     <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
    //       <SearchbarStyle>
    //         <Input
    //           autoFocus
    //           fullWidth
    //           disableUnderline
    //           placeholder="Search…"
    //           startAdornment={
    //             <InputAdornment position="start">
    //               <SearchRoundedIcon fontSize="large"/>
    //             </InputAdornment>
    //           }
    //           sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
    //         />
    //         <Button variant="contained" onClick={handleClose}>
    //           Search
    //         </Button>
    //       </SearchbarStyle>
    //     </Slide>
    //   </div>
    // </ClickAwayListener>
  );
}

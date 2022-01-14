// components
import SearchIcon from '@mui/icons-material/Search';
import { Button, ClickAwayListener, Input, InputAdornment, Slide } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { IconButtonAnimate } from '../../../components/animate';
import {
  NAVBAR_HEIGHT
} from '../../../config';


// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const DropSearchbarStyle = styled('div')(({ theme }) => ({
  // ...cssStyles(theme).bgBlur(),
  backgroundColor: 'white',
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'fixed',
  alignItems: 'center',
  height: NAVBAR_HEIGHT,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('desktop')]: {
    padding: theme.spacing(0, 5),
    width: '640px',
    //marginRight: SIDEBAR_WIDTH_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

export default function DropSearchbar() {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButtonAnimate  onClick={handleOpen}>
            <SearchIcon fontSize='large'/>
          </IconButtonAnimate>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <DropSearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon fontSize='large'/>
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </DropSearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}

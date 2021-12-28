import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, AppBar, Toolbar, Badge, IconButton, Fab } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import EditIcon from '@mui/icons-material/Edit';

// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
import useCollapseSidebar from '../../../hooks/useCollapseSidebar';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import {
  SIDEBAR_WIDTH_DESKTOP,
  NAVBAR_HEIGHT,
} from '../../../config';
// components
//
import Searchbar from './Searchbar';
import DropSearchbar from './DropSearchbar';
import ClickwableWideLogo from '../../../components/ClickableWideLogo';
import AutocompleteSearch from './AutocompleteSearch';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  // boxShadow: 'none', //prevents contrast between Navbar and main page
  backgroundColor: 'white',
  // ...cssStyles(theme).bgBlur(), creates a transparent background
  [theme.breakpoints.up('desktop')]: {
    marginRight: SIDEBAR_WIDTH_DESKTOP/2, //this divide by 2 quirk works because .. the containing div above is also restricted to SIDEBAR_WIDTH.. i think
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: NAVBAR_HEIGHT,
}));

// ----------------------------------------------------------------------

type NavbarProps = {
  onOpenSidebar: VoidFunction;
  handleDialogOpen: VoidFunction
};

export default function Navbar({ onOpenSidebar, handleDialogOpen }: NavbarProps) {
  const isDesktop = useResponsive('up', 'desktop');

  return (
      <RootStyle >
        <ToolbarStyle>
          <Container disableGutters maxWidth={'tablet'} sx={{flexDirection: 'row-reverse', height:'4ch', alignItems: 'center', display:'flex',position:'relative'}}>
            <ClickwableWideLogo sx={{position:'absolute', top:0, left:10, zIndex:1,}} />
            <Searchbar />
            {!isDesktop  && (
              <IconButton onClick={onOpenSidebar} sx={{position:'absolute', zIndex:1, top:-2, right:10, color: 'text.primary' }}>
                <Badge overlap="circular" badgeContent={2} color="error">
                  <MenuRoundedIcon fontSize='large' />
                </Badge> 
              </IconButton>
              )}
            {isDesktop  && (
              <Fab onClick={handleDialogOpen} size='medium' color="primary" aria-label="입력하기" sx={{position:'absolute', zIndex:1, top:-2, right:10 }}>
                <EditIcon />
              </Fab>
              )}
          </Container>
        </ToolbarStyle>
      </RootStyle>
  );
}

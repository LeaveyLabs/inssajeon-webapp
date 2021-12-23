import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, AppBar, Toolbar, Badge } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
import useCollapseSidebar from '../../../hooks/useCollapseSidebar';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import {
  SIDEBAR_WIDTH_MOBILE,
  NAVBAR_HEIGHT,
} from '../../../config';
// components
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButtonAnimate } from '../../../components/animate';
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
    marginRight: SIDEBAR_WIDTH_MOBILE/2, //this divide by 2 quirk works because .. the containing div above is also restricted to SIDEBAR_WIDTH.. i think
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: NAVBAR_HEIGHT,
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
};

export default function Navbar({ onOpenSidebar }: Props) {
  const isDesktop = useResponsive('up', 'desktop');

  return (
      <RootStyle >
        <ToolbarStyle>
          <Container maxWidth={'tablet'}>
            <Box sx={{ display:'flex',  flexDirection: 'row', alignItems: 'center'}}>
              <ClickwableWideLogo />
              <Box sx={{ flexGrow: 1 }} />
              <DropSearchbar />
              {!isDesktop  && (
                <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 0,mt:0, color: 'text.primary' }}>
                  <Badge badgeContent={2} color="error">
                    <MenuRoundedIcon fontSize='large' />
                  </Badge> 
                </IconButtonAnimate>
              )}
            </Box>
          </Container>
        </ToolbarStyle>
      </RootStyle>
  );
}

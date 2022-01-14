import { Box, Drawer } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// config
import { SIDEBAR_WIDTH_DESKTOP, SIDEBAR_WIDTH_MOBILE } from '../../../config';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from './Scrollbar';
import NavSection from './sidebar-nav';
//
import SidebarAccount from './SidebarAccount';
import sidebarConfig from './SidebarConfig';
import SidebarFooter from './SidebarFooter';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  // [theme.breakpoints.up('desktop')]: {
  //   flexShrink: 0,
  //   transition: theme.transitions.create('width', {
  //     duration: theme.transitions.duration.shorter,
  //   }),
  // }, 
}));

// ----------------------------------------------------------------------

type Props = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function Sidebar({ isOpenSidebar, onCloseSidebar }: Props) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'desktop');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <SidebarAccount />
      <NavSection navConfig={sidebarConfig} />
      <Box sx={{ flexGrow: 1 }} />
      <SidebarFooter />
    </Scrollbar>
  );

  return ( 
    <RootStyle
      sx={{
        width: {
          desktop: SIDEBAR_WIDTH_DESKTOP,
        },
      }}
    >
      {!isDesktop && (
        <Drawer
          anchor={'right'}
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: SIDEBAR_WIDTH_MOBILE } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          anchor={'right'}
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: SIDEBAR_WIDTH_DESKTOP,
              //borderLeftStyle: 'dashed',
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

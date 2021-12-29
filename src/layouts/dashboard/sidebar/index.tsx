import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Drawer, IconButton } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useCollapseSidebar from '../../../hooks/useCollapseSidebar';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { SIDEBAR_WIDTH_DESKTOP, SIDEBAR_WIDTH_MOBILE } from '../../../config';
// components
import Scrollbar from '../../../components/Scrollbar';
import NavSection from '../../../components/nav-section';
//
import SidebarAccount from './SidebarAccount';
import SidebarFooter from './SidebarFooter';
import sidebarConfig from './SidebarConfig';

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
  const theme = useTheme();
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
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <SidebarAccount />
      </Stack>
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

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Drawer, IconButton } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSE_WIDTH } from '../../../config';
// components
import Scrollbar from '../../../components/Scrollbar';
import NavSection from '../../../components/nav-section';
//
import SidebarAccount from './SidebarAccount';
import SidebarFooter from './SidebarFooter';
import CollapseButton from './CollapseButton';
import sidebarConfig from './SidebarConfig';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  }, 
}));

// ----------------------------------------------------------------------

type Props = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function Sidebar({ isOpenSidebar, onCloseSidebar }: Props) {
  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

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
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <SidebarAccount isCollapse={isCollapse} />
      </Stack>
      <NavSection navConfig={sidebarConfig} isCollapse={isCollapse} />
      <Box sx={{ flexGrow: 1 }} />
      {!isCollapse && <SidebarFooter />}
    </Scrollbar>
  );

  return ( 
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? SIDEBAR_COLLAPSE_WIDTH : SIDEBAR_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          anchor={'right'}
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: SIDEBAR_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          anchor={'right'}
          open
          variant="persistent"
          // onMouseEnter={onHoverEnter} TODO : TURN OFF HOVER FEATURE LATER ON
          // onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: SIDEBAR_WIDTH,
              borderLeftStyle: 'dashed',
              bgcolor: 'background.default',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: SIDEBAR_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

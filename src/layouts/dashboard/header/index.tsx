// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import {
  DASHBOARD_NAVBAR_WIDTH,
  DASHBOARD_HEADER_MOBILE,
  DASHBOARD_HEADER_DESKTOP,
  DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
} from '../../../config';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

type RootStyleProps = {
  isCollapse: boolean | undefined;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})<RootStyleProps>(({ isCollapse, theme }) => ({
  boxShadow: 'none',
  ...cssStyles(theme).bgBlur(),
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DASHBOARD_NAVBAR_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${DASHBOARD_NAVBAR_COLLAPSE_WIDTH}px)`,
    }),
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: DASHBOARD_HEADER_MOBILE,
  transition: theme.transitions.create('min-height', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5),
    minHeight: DASHBOARD_HEADER_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
};

export default function DashboardHeader({ onOpenSidebar }: Props) {
  const { isCollapse } = useCollapseDrawer();

  const isOffset = useOffSetTop(DASHBOARD_HEADER_DESKTOP);

  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle isCollapse={isCollapse}>
      <ToolbarStyle
        sx={{
          ...(isOffset && {
            minHeight: { md: DASHBOARD_HEADER_DESKTOP - 16 },
          }),
        }}
      >
        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          <NotificationsPopover />
          <ContactsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

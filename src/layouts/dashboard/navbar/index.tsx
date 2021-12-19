// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Badge } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import {
  SIDEBAR_WIDTH,
  NAVBAR_MOBILE,
  NAVBAR_DESKTOP,
  SIDEBAR_COLLAPSE_WIDTH,
} from '../../../config';
// components
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButtonAnimate } from '../../../components/animate';
//
import Searchbar from './Searchbar';
import ClickwableWideLogo from '../../../components/ClickableWideLogo';

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
    width: `calc(100% - ${SIDEBAR_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${SIDEBAR_COLLAPSE_WIDTH}px)`,
    }),
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: NAVBAR_MOBILE,
  transition: theme.transitions.create('min-height', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5),
    minHeight: NAVBAR_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
};

export default function Navbar({ onOpenSidebar }: Props) {
  const { isCollapse } = useCollapseDrawer();

  const isOffset = useOffSetTop(NAVBAR_DESKTOP);

  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle isCollapse={isCollapse}>
      <ToolbarStyle
        sx={{
          ...(isOffset && {
            minHeight: { md: NAVBAR_DESKTOP - 16 },
          }),
        }}
      >
        <ClickwableWideLogo />
        <Box sx={{ flexGrow: 1 }} />
        <Searchbar />
        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Badge badgeContent={2} color="error">
              <MenuRoundedIcon fontSize='large' />
            </Badge>
          </IconButtonAnimate>
        )}
      </ToolbarStyle>
    </RootStyle>
  );
}

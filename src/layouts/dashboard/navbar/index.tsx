import EditIcon from '@mui/icons-material/Edit';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { AppBar, Badge, Container, Fab, IconButton, Toolbar } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import useAuth from 'src/hooks/useAuth';
import ClickwableWideLogo from '../../../components/misc/ClickableWideLogo';
// config
import {
  NAVBAR_HEIGHT, SIDEBAR_WIDTH_DESKTOP
} from '../../../config';
import useResponsive from '../../../hooks/useResponsive';
// components
//
import Searchbar from './Searchbar';


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
  handleSubmitDialogOpen: VoidFunction;
  handleSignupDialogOpen: VoidFunction;
};
//TODO: kevin's suggestions: remove shadow from fab button, and tighten navbar to align with width of posts on desktop 

export default function Navbar({ onOpenSidebar, handleSubmitDialogOpen, handleSignupDialogOpen }: NavbarProps) {
  const isDesktop = useResponsive('up', 'desktop');
  const {authedUser} = useAuth();

  let handleFabClick = () => {
    if (authedUser) {
      handleSubmitDialogOpen();
    } else {
      handleSignupDialogOpen();
    }
  }

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
              <Fab onClick={handleFabClick} size='medium' color="primary" aria-label="입력하기" sx={{position:'absolute', zIndex:1, top:-2, right:10 }}>
                <EditIcon />
              </Fab>
              )}
          </Container>
        </ToolbarStyle>
      </RootStyle>
  );
}


import { AppBar, Box, Container, Toolbar } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
// components
import ClickwableWideLogo from 'src/components/misc/ClickableWideLogo';
// config
import { NAVBAR_HEIGHT } from 'src/config';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none', //prevents contrast between Navbar and main page
  backgroundColor: 'white',
  // ...cssStyles(theme).bgBlur(), creates a transparent background
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: NAVBAR_HEIGHT,
}));

const MainStyle = styled('main')(({ theme }) => ({
  flexGrow: 1,
  paddingTop: 10,
  paddingBottom: 0,
}));

// -------------------------------------


export default function PlainLayout() {

  return (
    <RootStyle >
      <ToolbarStyle>
        <Container maxWidth={'tablet'}>
          <Box sx={{ display:'flex',  flexDirection: 'row', alignItems: 'center'}}>
            <ClickwableWideLogo />
          </Box>
        </Container>
      </ToolbarStyle>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
    
  );
}
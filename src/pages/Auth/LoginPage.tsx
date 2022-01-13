import { Box, Card, Container, Link, Stack, Typography } from '@mui/material';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ClickwableWideLogoLarge from 'src/components/misc/ClickableWideLogoLarge';
// hooks
import useAuth from 'src/hooks/useAuth';
import useResponsive from 'src/hooks/useResponsive';
// routes
import { PAGE_PATHS } from 'src/routing/paths';
import LoginForm from '../../components/auth/LoginForm';
// components
import Page from '../Page';

// ----------------------------------------------------------------------


const MobileStyle = styled(Container)(({ theme }) => ({
  maxWidth: 480,
  padding: theme.spacing(3, 3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const DesktopStyle = styled(Container)(({ theme }) => ({
  maxWidth: 520,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

function LoginContent() {
  return (
      <Box >
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 4, }}>
          <Typography variant="h1" gutterBottom sx={{mb:0}}>
            로그인싸
          </Typography>
        </Stack>
        <LoginForm />
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          계정이 없습니까?{' '}
          <Link variant="subtitle2" component={RouterLink} to={PAGE_PATHS.auth.signup}>
            가입하세요
          </Link>
        </Typography>
      </Box>
  )
}

export default function LoginPage() {
  const {  } = useAuth();
  const isMobile = useResponsive('down', 'tablet'); //TODO why is it taking so long to be repsonsive here?
  const theme = useTheme()

  //HEIGHT: 100% REALLY CHANGES HOW ITEMS ARE POSITIONED VERTICALLY. FIXED PAGES NEED HEIGHT: 100%.
  return (
    <Page sx={{height:'100%'}} title="로그인"> 
      {isMobile ?
        <MobileStyle>
          <ClickwableWideLogoLarge/>
          <Box sx={{flexGrow:1}}/>
          <LoginContent/>
          <Box sx={{flexGrow:1}}/>
        </MobileStyle>
      : //!isMobile
        <DesktopStyle>
          <Card sx={{padding: theme.spacing(3, 3), }}>
            <ClickwableWideLogoLarge sx={{mb:10}}/>
            <LoginContent/>
          </Card>
        </DesktopStyle>
      }
    </Page>
  );
}

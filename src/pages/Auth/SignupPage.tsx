import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Link, Typography, Stack, Container, Card } from '@mui/material';
// hooks
import useAuth from 'src/hooks/useAuth';
import useResponsive from 'src/hooks/useResponsive';
// routes
import { PAGE_PATHS } from 'src/routing/paths';
// components
import Page from '../Page';
import ClickwableWideLogoLarge from 'src/components/misc/ClickableWideLogoLarge';
import SignupForm from '../../components/auth/SignupForm';
import CreateProfileForm from 'src/components/auth/CreateProfileForm';

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

function SignupContent() {
  const [signedUp, setSignedUp] = useState(false); //true indicates that user signedup, so now direct them to createProfile page

  return (
    <Box >
      {signedUp ? 
        <>
          <Stack direction="column" alignItems="center" justifyContent="center" sx={{ mb: 4, }}>
            <Typography variant="h2" gutterBottom sx={{mb:2}}>이름 짓기</Typography>
            <Typography sx={{ color: 'text.secondary' }}>인싸전에서 이 이름으로 알려질 거예요.</Typography>
            <Typography sx={{ color: 'text.secondary' }}>본명, 가명, 별명 다 좋아요.</Typography>
            <Typography sx={{ color: 'text.secondary' }}>나중에도 바꿀 수 있어요.</Typography>
          </Stack>
          <CreateProfileForm  />
        </>
      :
        <>
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 4, }}>
            <Typography variant="h1" gutterBottom sx={{mb:0}}>인싸되기</Typography>
          </Stack>
          <SignupForm goToCreateProfile={() => setSignedUp(true)} />
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            가입하시면, 인싸전의&nbsp;
            <Link variant="subtitle2" target="_blank" rel="noopener" href={PAGE_PATHS.page.terms}>이용약관</Link>
            과 {''}
            <Link variant="subtitle2" target="_blank" rel="noopener" href={PAGE_PATHS.page.privacy}>개인정보취급방침</Link>
            에 동의하시는 겁니다.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            계정이 이미 있습니까?{' '}
            <Link variant="subtitle2" component={RouterLink} to={PAGE_PATHS.auth.login}>로그인하세요</Link>
          </Typography>
        </>
      }
    </Box>
  )
}

export default function SignupPage() {
  const isMobile = useResponsive('down', 'tablet'); //TODO why is it taking so long to be repsonsive here?
  const theme = useTheme()

  //HEIGHT: 100% REALLY CHANGES HOW ITEMS ARE POSITIONED VERTICALLY. FIXED PAGES NEED HEIGHT: 100%.
  return (
    <Page sx={{height:'100%'}} title="로그인"> 
      {isMobile ?
        <MobileStyle>
          <ClickwableWideLogoLarge/>
          <Box sx={{flexGrow:1}}/>
          <SignupContent/>
          <Box sx={{flexGrow:1}}/>
        </MobileStyle>
      : //!isMobile
        <DesktopStyle>
          <Card sx={{padding: theme.spacing(3, 3), }}>
            <ClickwableWideLogoLarge sx={{mb:10}}/>
            <SignupContent/>
          </Card>
        </DesktopStyle>
      }
    </Page>
  );
}
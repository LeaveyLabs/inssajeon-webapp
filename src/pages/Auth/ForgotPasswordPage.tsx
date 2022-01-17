//react
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ForgotPasswordForm from 'src/components/auth/ForgotPasswordForm';
import ClickwableWideLogoLarge from 'src/components/misc/ClickableWideLogoLarge';
import useResponsive from 'src/hooks/useResponsive';
// routes
import { PAGE_PATHS } from 'src/routing/paths';
// components
import Page from '../Page';


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

type ContentProps = {
  email: string;
  sent: Boolean;
  setEmail: any;
  setSent: any;
}

//TODO add forgotEmail and signupEmailConfirmation functionality to authentication process

function ForgotPasswordContent( {sent, setSent} : ContentProps) {
  return (
    <Box sx={{ maxWidth: 480 }} >
      {!sent ? (
        <>
          <Stack direction="column" alignItems="center" justifyContent="center" sx={{ mb: 4, }}>
            <Typography variant="h2" gutterBottom sx={{mb:2}}>
              비밀번호 찾기
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              비밀번호를 찾고자 하는 아이디를 입력하세요.
            </Typography>
          </Stack>
          <ForgotPasswordForm
            onSent={() => setSent(true)}
          />

          <Button
            fullWidth
            size="large"
            component={RouterLink}
            to={PAGE_PATHS.auth.login}
            sx={{ mt: 1 }}
          >
            돌아가기
          </Button>
        </>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>성공</Typography>
          <Typography>확인 이메일 보냈습니다.</Typography>
          <Typography>이메일 못 찾으면, 입력하신 이메일과 관련된 계정이 존재하지 않습니다.</Typography>
          <Button
            size="large"
            variant="contained"
            component={RouterLink}
            to={PAGE_PATHS.auth.login}
            sx={{ mt: 5 }}
          >
            돌아가기
          </Button>
        </Box>
      )}
    </Box>
  )
}

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  const isMobile = useResponsive('down', 'tablet');
  const theme = useTheme()
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Page sx={{height:'100%'}} title="비밀번호 찾기"> 
    {isMobile ?
      <MobileStyle>
        <ClickwableWideLogoLarge/>
        <Box sx={{flexGrow:1}}/>
        <ForgotPasswordContent email={email} setEmail={setEmail} sent={sent} setSent={setSent}/>
        <Box sx={{flexGrow:1}}/>
      </MobileStyle>
    : //!isMobile
      <DesktopStyle>
        <Card sx={{padding: theme.spacing(3, 3), }}>
          <ClickwableWideLogoLarge sx={{mb:10}}/>
          <ForgotPasswordContent email={email} setEmail={setEmail} sent={sent} setSent={setSent}/>
        </Card>
      </DesktopStyle>
    }
  </Page>
  );
}
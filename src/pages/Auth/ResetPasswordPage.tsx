import { Box, Button, Card, Container, Divider, Grid, Stack, Typography } from '@mui/material';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import useResponsive from 'src/hooks/useResponsive';
// components
import Page from '../Page';
import ResetPasswordForm from 'src/components/auth/ResetPasswordForm';

// ----------------------------------------------------------------------
//

const MobileStyle = styled(Container)(({ theme }) => ({
  maxWidth: 480,
  padding: theme.spacing(3, 3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const DesktopStyle = styled(Container)(({ theme }) => ({
  maxWidth: 800,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

function ResetPasswordContent() {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" sx={{ mb: 2, }}>
      <Typography variant="h2" gutterBottom sx={{mb:2}}>비밀번호 재설정</Typography>
      <ResetPasswordForm />
    </Stack>
  )
}

export default function CreateResetPasswordPage() {
  const isMobile = useResponsive('down', 'tablet'); //TODO why is it taking so long to be repsonsive here?
  const theme = useTheme();

  //HEIGHT: 100% REALLY CHANGES HOW ITEMS ARE POSITIONED VERTICALLY. FIXED PAGES NEED HEIGHT: 100%.
  return (
    <Page sx={{height:'100%'}} title="비밀번호 재설정"> 
      <DesktopStyle>
        <Card sx={{padding: theme.spacing(3, 3)}}>
          <ResetPasswordContent/>
        </Card>
      </DesktopStyle>
    </Page>
  );
}

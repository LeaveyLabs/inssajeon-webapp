// // @mui
// import { Container, Typography } from '@mui/material';
// // hooks
// // components
// import Page from '../Page';

// // ----------------------------------------------------------------------

// export default function SettingsPage() {

//   return (
//     <Page title="홈">
//       <Container maxWidth={'fullscreen'}>
//         <Typography variant="h3" component="h1" paragraph>
//           word
//         </Typography>
//         <Typography gutterBottom>
//           description
//         </Typography>
//         <Typography>
//           quote
//         </Typography>
//       </Container>
//     </Page>
//   );
// }

import { Box, Button, Card, Container, Divider, Grid, Stack, Typography } from '@mui/material';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import EditProfileForm from 'src/components/account/EditProfileForm';
import EditAccountForm from 'src/components/account/EditAccountForm';
import ClickwableWideLogoLarge from 'src/components/misc/ClickableWideLogoLarge';
import useResponsive from 'src/hooks/useResponsive';
// components
import Page from '../Page';

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

function ProfileSettingsContent() {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" sx={{ mb: 2, }}>
      <Typography variant="h2" gutterBottom sx={{mb:2}}>프로파일 편집</Typography>
      <EditProfileForm />
    </Stack>
  )
}

function AccountSettingsContent() {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" sx={{ mb: 2, }}>
      <Typography variant="h2" gutterBottom sx={{mb:2}}>계정 편집</Typography>
      <EditAccountForm />
    </Stack>
  )
}

export default function CreateProfilePage() {
  const isMobile = useResponsive('down', 'tablet'); //TODO why is it taking so long to be repsonsive here?
  const theme = useTheme()
  const [selection, setSelection] = useState(0);

  //HEIGHT: 100% REALLY CHANGES HOW ITEMS ARE POSITIONED VERTICALLY. FIXED PAGES NEED HEIGHT: 100%.
  return (
    <Page sx={{height:'100%'}} title="로그인"> 
      <DesktopStyle>
        <Card sx={{padding: theme.spacing(3, 3)}}>
          <Box>
            {/* Settings Controls */}
            <Stack direction="column" alignItems="center" 
              justifyContent="center" sx={{mb: 2}}>
              <Button fullWidth
                      size="large"
                      variant="outlined"
                      sx={{ mb: 2, }}
                      onClick={() => setSelection(0)}>
                프로파일
              </Button>
              <Button fullWidth
                      size="large"
                      variant="outlined"
                      sx={{ mb: 2, }}
                      onClick={() => setSelection(1)}>
                계정
              </Button>
            </Stack>
          </Box>
          <Box>
            {/* Selected Setting */}
            {selection == 0 && <ProfileSettingsContent/> ||
            selection == 1 && <AccountSettingsContent/>}
          </Box>
        </Card>
      </DesktopStyle>
    </Page>
  );
}

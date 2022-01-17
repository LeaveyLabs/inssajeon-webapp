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

import { Box, Card, Container, Stack, Typography } from '@mui/material';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import EditProfileForm from 'src/components/account/EditProfileForm';
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
  maxWidth: 520,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

function CreateProfileContent() {
  return (
    <Box >
      <Stack direction="column" alignItems="center" justifyContent="center" sx={{ mb: 4, }}>
        <Typography variant="h2" gutterBottom sx={{mb:2}}>프로파일 편집</Typography>
      </Stack>
      <EditProfileForm />
    </Box>
  )
}

export default function CreateProfilePage() {
  const isMobile = useResponsive('down', 'tablet'); //TODO why is it taking so long to be repsonsive here?
  const theme = useTheme()

  //HEIGHT: 100% REALLY CHANGES HOW ITEMS ARE POSITIONED VERTICALLY. FIXED PAGES NEED HEIGHT: 100%.
  return (
    <Page sx={{height:'100%'}} title="로그인"> 
      {isMobile ?
        <MobileStyle>
          <ClickwableWideLogoLarge/>
          <Box sx={{flexGrow:1}}/>
          <CreateProfileContent/>
          <Box sx={{flexGrow:1}}/>
        </MobileStyle>
      : //!isMobile
        <DesktopStyle>
          <Card sx={{padding: theme.spacing(3, 3), }}>
            <ClickwableWideLogoLarge sx={{mb:10}}/>
            <CreateProfileContent/>
          </Card>
        </DesktopStyle>
      }
    </Page>
  );
}

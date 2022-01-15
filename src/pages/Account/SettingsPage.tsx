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
        <Typography variant="h2" gutterBottom sx={{mb:2}}>이름 짓기</Typography>
        <Typography sx={{ color: 'text.secondary' }}>인싸전에서 이 이름으로 알려질 거예요.</Typography>
        <Typography sx={{ color: 'text.secondary' }}>본명, 가명, 별명 다 좋아요.</Typography>
        <Typography sx={{ color: 'text.secondary' }}>나중에도 바꿀 수 있어요.</Typography>
      </Stack>
      <EditAccountForm />
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

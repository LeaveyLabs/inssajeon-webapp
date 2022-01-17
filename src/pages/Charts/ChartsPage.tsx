// @mui
import { Box, Card, CardContent, CardHeader, Container, styled, Typography } from '@mui/material';
// hooks
// components
import Page from '../Page';
import ChartArea from './ChartArea';
import { useTheme } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(2),
  // paddingBottom: theme.spacing(10),
}));

export default function ChartsPage() {
  const theme = useTheme();
  // <Container maxWidth={'fullscreen'}>

  return (
    <Page title="차트">
      <RootStyle>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Coming Soon!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We are currently working hard on this page!
          </Typography>
          <Card sx={{mt:theme.spacing(5)}} >
            <CardHeader title="유행 차트" titleTypographyProps={{variant:'h3',}}  subheader="대단" subheaderTypographyProps={{variant:'subtitle1',}}/>
            <CardContent>
              <ChartArea />
            </CardContent>
          </Card>
        </Box>
        {/* </Container> */}
      </RootStyle>
    </Page>
  );
}

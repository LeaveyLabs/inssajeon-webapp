// @mui
import { Container, Typography } from '@mui/material';
// hooks
// components
import Page from '../Page';

// ----------------------------------------------------------------------

export default function AboutPage() {

  return (
    <Page title="홈">
      <Container maxWidth={'fullscreen'}>
        <Typography variant="h3" component="h1" paragraph>
          about us
        </Typography>
        <Typography gutterBottom>
          yup
        </Typography>
      </Container>
    </Page>
  );
}

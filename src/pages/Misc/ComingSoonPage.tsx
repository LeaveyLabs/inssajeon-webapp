// @mui
import { Container, Typography } from '@mui/material';
// hooks
// components
import Page from '../Page';

// ----------------------------------------------------------------------

export default function ComingSoonPage() {

  return (
    <Page title="">
      <Container maxWidth={'fullscreen'}>
        <Typography variant="h3" component="h1" paragraph>
          coming soon...
        </Typography>
      </Container>
    </Page>
  );
}

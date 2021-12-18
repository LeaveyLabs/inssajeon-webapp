// @mui
import { Container, Typography } from '@mui/material';
// hooks

// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function HomePage() {

  return (
    <Page title="홈">
      <Container maxWidth={'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          word
        </Typography>
        <Typography gutterBottom>
          description
        </Typography>
        <Typography>
          quote
        </Typography>
      </Container>
    </Page>
  );
}

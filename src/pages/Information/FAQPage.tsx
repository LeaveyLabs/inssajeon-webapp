// @mui
import { Container, Typography } from '@mui/material';
// hooks
// components
import Page from '../Page';

// ----------------------------------------------------------------------

export default function FAQPage() {

  return (
    <Page title="자주 묻는 질문">
      <Container maxWidth={'fullscreen'}>
        <Typography variant="h3" component="h1" paragraph>
          인싸전 왜 이렇게나 멋지지?
        </Typography>
      </Container>
    </Page>
  );
}



// @mui
import { Container, Typography } from '@mui/material';
// hooks

// components
import Page from '../../components/Page';
import SubmitForm from 'src/components/submit/SubmitForm';

// ----------------------------------------------------------------------

export default function SubmitPage() {

  return (
    <Page title="입력하기">
      <Container maxWidth={'tablet'}>
        <SubmitForm/>
      </Container>
    </Page>
  );
}

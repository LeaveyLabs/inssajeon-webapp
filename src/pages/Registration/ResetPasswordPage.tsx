//react
import { useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Button } from '@mui/material';
import { SentIcon } from 'src/assets';
// hooks
import useAuth from 'src/hooks/useAuth';
import useResponsive from 'src/hooks/useResponsive';
// routes
import { PAGE_PATHS } from 'src/routing/paths';
// components
import Page from '../Page';
import Image from 'src/components/misc/Image';
import SignupForm from 'src/components/auth/SignupForm';
import ClickwableWideLogo from 'src/components/misc/ClickableWideLogo';
import ResetPasswordForm from 'src/components/auth/ResetPasswordForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  Forgot your password?
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Please enter the email address associated with your account and We will email you
                  a link to reset your password.
                </Typography>

                <ResetPasswordForm
                  onSent={() => setSent(true)}
                  onGetEmail={(value) => setEmail(value)}
                />

                <Button
                  fullWidth
                  size="large"
                  component={RouterLink}
                  to={PAGE_PATHS.auth.login}
                  sx={{ mt: 1 }}
                >
                  Back
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Request sent successfully
                </Typography>
                <Typography>
                  We have sent a confirmation email to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PAGE_PATHS.auth.login}
                  sx={{ mt: 5 }}
                >
                  Back
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}


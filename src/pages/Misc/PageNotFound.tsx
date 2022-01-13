import { Box, Button, Container, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// assets
import { PageNotFoundIllustration } from '../../assets';
import { MotionContainer, varBounce } from '../../components/animate';
// components
import Page from '../Page';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function PageNotFound() {
  return (
    <Page title="404" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                앗! 죄송해요.
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}>
              <p>원하시는 페이지를 찾을 수 없어요.
              찾으시려는 페이지의 주소가 잘못 입력되었거나,
              페이지 주소가 변경 또는 삭제되어 더는 사용하실 수 없습니다.</p>
              <br/>
              <p>입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요</p>
            </Typography>

            <m.div variants={varBounce().in}>
              <PageNotFoundIllustration sx={{ height: 260, my: { mobile: 5 } }} />
            </m.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              홈으로 이동
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

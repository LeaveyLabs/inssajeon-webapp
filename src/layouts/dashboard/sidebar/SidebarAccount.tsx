// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar, Badge, Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATHS } from 'src/routing/paths';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function SidebarAccount( ) {
  let {authedUser, logout} = useAuth()
  let navigate = useNavigate()

  let handleLogout = async () => {
    await logout();
    //navigate(PAGE_PATHS.auth.login);
  }

  return (
    <Box sx={{pt: 3, pb: 2, px: 2.5,flexShrink: 0, }}>
      <Link underline="none" color="inherit">
        <RootStyle>
          <Badge overlap="circular" badgeContent={0} color="error">
            <Avatar
              src=""
              alt="Rayan Moran"
            />
          </Badge>
          <Box sx={{ml: 2, width: '100%', }}>
            {authedUser ? 
              <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography variant="subtitle1" noWrap>
                  {authedUser.nonauth.profile.username}
                </Typography>
                <Button onClick={handleLogout}>
                  <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                    로그아웃
                  </Typography>  
                </Button>
              </Box>
            :
              <Button onClick={() => navigate(PAGE_PATHS.auth.signup) }>
                <Typography variant="h4" noWrap sx={{ color: 'text.secondary' }}>
                  가입하기
                </Typography>  
              </Button>
            }
          </Box>
        </RootStyle>
      </Link>
    </Box>

  );
}

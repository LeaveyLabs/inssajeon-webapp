// @mui
import { Avatar, Badge, Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATHS } from 'src/routing/paths';
import getAvatarColor from 'src/utils/getAvatarColor';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

export default function SidebarAccount( ) {
  const {authedUser, logout} = useAuth()
  const navigate = useNavigate()
  const theme = useTheme();
  
  const handleLogout = async () => {
    await logout();
    navigate(PAGE_PATHS.auth.login);
  }
  const handleGoToProfile = async () => {
    navigate(`${PAGE_PATHS.dashboard.profile}/${authedUser?.nonauth.profile.username}`);
  }
  
  return (
    <Box sx={{pt: 3, pb: 2, px: 2.5,flexShrink: 0, }}>
        {authedUser ? 
          <RootStyle>
            <Box sx={{ml: 1, width: '100%',display:'flex', justifyContent:'flex-start', alignItems:'flex-start' }}>
              <Badge overlap="circular" badgeContent={0} color="error">
                <Avatar sx={{bgcolor: getAvatarColor(authedUser?.nonauth.id) }} src={authedUser?.nonauth.profile.picPath} />
              </Badge>
              <Stack spacing={1} sx={{mt:theme.spacing(0.8)}}>
                <Typography sx={{ml:2}} variant="subtitle1" noWrap>{authedUser.nonauth.profile.username}</Typography>
                {/* <Typography sx={{ml:2}} variant="body2" >{authedUser.nonauth.metrics.inssajeom} 인싸점</Typography> */}
                <Button onClick={handleGoToProfile}>
                  <Typography variant="body2"  sx={{ color: 'text.secondary' }}>내 프로필</Typography>  
                </Button>
              </Stack>
            </Box>
          </RootStyle>
          :
            <RootStyle>
              <Avatar src={""} alt={"guest"}/>
              <Box sx={{ml: 2, width: '100%',display:'flex', justifyContent:'space-between' }}>
                <Button onClick={() => navigate(PAGE_PATHS.auth.signup) }>
                  <Typography variant="h4" noWrap sx={{ color: 'text.secondary' }}>
                    가입하기
                  </Typography>  
                </Button>
              </Box>
            </RootStyle>
          }
    </Box>

  );
}

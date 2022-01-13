// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar, Badge, Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATHS } from 'src/routing/paths';

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
  let {authedUser, logout} = useAuth()
  let navigate = useNavigate()

  let handleLogout = async () => {
    await logout();
    //navigate(PAGE_PATHS.auth.login);
  }
  return (
    <Box sx={{pt: 3, pb: 2, px: 2.5,flexShrink: 0, }}>
        {authedUser ? 
          <RootStyle>
            <Box sx={{ml: 2, width: '100%',display:'flex', justifyContent:'space-between' }}>
              <Badge overlap="circular" badgeContent={0} color="error">
                <Avatar src={authedUser.nonauth.profile.picPath} alt={authedUser.nonauth.profile.username}/>
              </Badge>
              <Typography sx={{ml:2}} variant="subtitle1" noWrap>{authedUser.nonauth.profile.username}</Typography>
            </Box>
            <Button onClick={handleLogout}>
              <Typography variant="body2"  sx={{ color: 'text.secondary' }}>내 프로필</Typography>  
            </Button>
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

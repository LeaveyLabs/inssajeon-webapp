// @mui
import { Badge, Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from 'src/components/experimental/CustomAvatar';
import { PAGE_PATHS } from 'src/routing/paths';
import useAuth from '../../../hooks/useAuth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ----------------------------------------------------------------------

const RootStyle = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
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
  const handleClick = async () => {
    if (authedUser) {
      navigate(`${PAGE_PATHS.dashboard.profile}/${authedUser?.nonauth.profile.username}`);
    } else {
      navigate(PAGE_PATHS.auth.signup);
    }
  }
  
  return (
    <Box sx={{pt: 3, pb: 2, px: 2.5,flexShrink: 0, }}>
        {authedUser ? 
          <RootStyle fullWidth onClick={handleClick}>
            <Badge overlap="circular" badgeContent={0} color="error">
              <CustomAvatar id={authedUser?.nonauth.id} picPath={authedUser?.nonauth.profile.picPath} />
            </Badge>
            <Typography variant="subtitle1" noWrap sx={{ color:'text.secondary', ml:theme.spacing(2) }}>{authedUser.nonauth.profile.username}</Typography>

              {/* <Stack spacing={1} alignItems='flex-start' sx={{ml:2, mt:theme.spacing(0.8)}}>
                <Typography variant="subtitle1" noWrap>{authedUser.nonauth.profile.username}</Typography>
                <Typography variant="body2"  sx={{ color: 'text.secondary' }}>내 프로필</Typography>  
              </Stack> */}
          </RootStyle>
          :
          <RootStyle fullWidth onClick={handleClick}>
            <CustomAvatar id={undefined} picPath={undefined} />
            <Typography variant="h4" noWrap sx={{ ml:theme.spacing(2) }}>가입하기</Typography> 
          </RootStyle>
          }
    </Box>

  );
}

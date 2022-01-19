//react

//mui
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
//entities
import { UserEntity } from 'src/db/entities/users/UserEntity';
//hooks
import useAuth from 'src/hooks/useAuth';
import { PAGE_PATHS } from 'src/routing/paths';
import CustomAvatar from '../experimental/CustomAvatar';
import ProfileMoreButton from './ProfileMoreButton';


// ----------------------------------------------------------------------

interface ProfileCardProps {
  profileUser: UserEntity;
  // setIsLoaded: VoidFunction;
}

export default function ProfileCard( { profileUser }: ProfileCardProps ) {
  const theme = useTheme();
  const {authedUser} = useAuth();
  const navigate = useNavigate();

  function goToUserSettings() {
    if (!authedUser) throw new Error("Cannot access settings page: user not signed in.");
    navigate(`${PAGE_PATHS.page.myAccount.settings}/${authedUser.nonauth.profile.username}`);
  }

  return (
    < > 
      <Box sx={{ height:'auto', display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <CustomAvatar sx={{mx:1, width:theme.spacing(10), height:theme.spacing(10) }} id={profileUser.id} picPath={profileUser.profile.picPath} />
        <Typography variant="h2" sx={{ mx:2,color: 'text.secondary' }}>{profileUser.profile.username}</Typography>
        <Box sx={{ flexGrow: 1 }} />
          {authedUser && authedUser.nonauth.profile.username === profileUser.profile.username ?
            <IconButton onClick={goToUserSettings}>
              <SettingsIcon/>
            </IconButton>
          :
            <ProfileMoreButton profileUser={profileUser} />
          }
      </Box>
      <Box sx={{ p:theme.spacing(1), my:theme.spacing(2), height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <Typography variant="subtitle2" sx={{ mx:2, }}>{profileUser.profile.bio}</Typography>
      </Box>
      <Divider variant="fullWidth" />
      <Stack  alignItems="center" direction='row' spacing={3} sx={{p: 3}}   divider={<Divider orientation="vertical" flexItem />}> 
        <div>
        <Typography variant="subtitle1">{profileUser.activity.submissions.length}</Typography>
        <Typography variant="subtitle1">게시물</Typography>

        </div>
        <Typography variant="subtitle1">인싸점: {profileUser.metrics.inssajeom}</Typography>
      </Stack>
    </>
  );
}

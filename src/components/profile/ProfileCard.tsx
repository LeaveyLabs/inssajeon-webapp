//react

//mui
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Divider, Stack, Typography, useTheme } from '@mui/material';
//entities
import { UserEntity } from 'src/db/entities/users/UserEntity';
//hooks
import useAuth from 'src/hooks/useAuth';
//utils
import getAvatarColor from 'src/utils/getAvatarColor';
import ProfileMoreButton from './ProfileMoreButton';


// ----------------------------------------------------------------------

interface ProfileCardProps {
  profileUser: UserEntity;
}

export default function ProfileCard( { profileUser }: ProfileCardProps ) {
  const theme = useTheme();
  const {authedUser} = useAuth();

  return (
    < > 
      <Box sx={{ height:'auto', display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <Avatar sx={{mx:1, width:theme.spacing(10), height:theme.spacing(10), bgcolor: getAvatarColor(profileUser.profile.username) }} src={profileUser.profile.picPath} />
        {/* <Link to={`${PAGE_PATHS.dashboard.profile}/${post.userProfile.username}`} variant="subtitle1" color="text.primary" component={RouterLink}>{post.userProfile.username}</Link> */}
        <Typography variant="h2" sx={{ mx:2,color: 'text.secondary' }}>{profileUser.profile.username}</Typography>
        <Box sx={{ flexGrow: 1 }} />
          {authedUser && authedUser.nonauth.profile.username === profileUser.profile.username ?
            <SettingsIcon/>
          :
            <ProfileMoreButton profileUser={profileUser} />
          }
      </Box>
      <Box sx={{ p:theme.spacing(1), my:theme.spacing(2), height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <Typography variant="subtitle2" sx={{ mx:2, }}>{profileUser.profile.bio}</Typography>
      </Box>
      <Divider variant="fullWidth" />
      <Stack  alignItems="center" direction='row' spacing={3} sx={{ p: 3}}   divider={<Divider orientation="vertical" flexItem />}> 
        <div>
        <Typography variant="subtitle1">{profileUser.activity.submissions.length}</Typography>
        <Typography variant="subtitle1">게시물</Typography>

        </div>
        <Typography variant="subtitle1">인싸점: {profileUser.metrics.inssajeom}</Typography>
      </Stack>
    </>
  );
}
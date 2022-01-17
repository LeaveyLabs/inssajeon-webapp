// @mui
import { Avatar, Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useAuth from 'src/hooks/useAuth';
import getAvatarColor from 'src/utils/getAvatarColor';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(1),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  //backgroundColor: theme.palette.grey[500_12],
}));

interface SubmitDialogProfileProps {
  handleClose: VoidFunction
}

// ----------------------------------------------------------------------

export default function SubmitDialogProfile( {handleClose} : SubmitDialogProfileProps  ) {
  let {authedUser} = useAuth()

  return (
    <Link underline="none" color="inherit">
      <RootStyle>
        <Avatar sx={{bgcolor: getAvatarColor(authedUser?.nonauth.id) }} src={authedUser?.nonauth.profile.picPath} />
        <Box sx={{ml: 2}}>
          <Typography variant="subtitle1" noWrap>
            {authedUser?.nonauth.profile.username}
          </Typography>
          {/* <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            extra text
          </Typography> */}
        </Box>
      </RootStyle>
    </Link>
  );
}

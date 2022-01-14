// @mui
import { Avatar, Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useAuth from 'src/hooks/useAuth';

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

// ----------------------------------------------------------------------

export default function SubmitDialogProfile( ) {
  let {authedUser} = useAuth()

  return (
    <Link underline="none" color="inherit">
      <RootStyle>
        <Avatar src="" alt="Rayan Moran"/>
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

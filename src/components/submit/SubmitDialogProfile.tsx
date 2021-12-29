// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar, Badge } from '@mui/material';

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
  return (
    <Link underline="none" color="inherit">
      <RootStyle>
        <Avatar
          src=""
          alt="Rayan Moran"
        />
        <Box sx={{ml: 2}}>
          <Typography variant="subtitle1" noWrap>
            username
          </Typography>
          {/* <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            extra text
          </Typography> */}
        </Box>
      </RootStyle>
    </Link>
  );
}

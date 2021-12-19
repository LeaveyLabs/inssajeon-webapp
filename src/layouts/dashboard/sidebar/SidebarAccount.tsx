// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar, Badge } from '@mui/material';

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

type Props = {
  isCollapse: boolean | undefined;
};

export default function SidebarAccount({ isCollapse }: Props) {
  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <Badge badgeContent={2} color="error">
          <Avatar
            src=""
            alt="Rayan Moran"
          />
        </Badge>
        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            username
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            extra text
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}

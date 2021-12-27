// @mui
import { Stack, Button, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'
// assets
import InstagramIcon from '@mui/icons-material/Instagram';

// ----------------------------------------------------------------------

export default function SidebarFooter() {
  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      {/* <Button variant="contained">Documentation</Button> */}
      {/* <Link href="/" underline="hover">click</Link>
      <RouterLink to="/">asdf</RouterLink> */}
      <a target="_blank" href="https://www.instagram.com/inssajeon/" rel="noreferrer">
        <IconButton>
          <InstagramIcon />
        </IconButton>
      </a>
      <div>
        <Typography component={Link} to={'/privacy'} variant="body2" sx={{ color: 'text.secondary', textDecoration:'none' }}>
          이용약관
        </Typography><br/>
        <Typography component={Link} to={'/terms'} variant="body2" sx={{ color: 'text.secondary', textDecoration:'none' }}>
          개인정보처리방침
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration:'none' }}>
          @Inssajeon 2022
        </Typography>
      </div>
    </Stack>
  );
}

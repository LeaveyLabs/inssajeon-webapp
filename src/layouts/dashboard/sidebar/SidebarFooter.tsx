// @mui
// assets
import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton, Link, Stack, Typography } from '@mui/material';
//utils
import { PAGE_PATHS } from 'src/routing/paths';

// ----------------------------------------------------------------------

export default function SidebarFooter() {
  return (
    <Stack
      spacing={0}
      sx={{ px: 5, pb: 3, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
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
        <Typography display='inline' variant="body2" sx={{ color: 'text.secondary'}}>
          <Link target="_blank" rel="noopener" href={PAGE_PATHS.page.terms}>이용약관</Link>
          {' | '}
          <Link target="_blank" rel="noopener" href={PAGE_PATHS.page.privacy}>개인정보처리방침</Link>
        </Typography><br/>
        <Typography display='inline' variant="body2" sx={{ color: 'text.secondary'}}>
          @Inssajeon 2022
        </Typography>
      </div>
    </Stack>
  );
}

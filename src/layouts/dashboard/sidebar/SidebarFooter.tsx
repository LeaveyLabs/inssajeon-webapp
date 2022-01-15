// @mui
// assets
import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton, Link, Stack, Typography } from '@mui/material';
//utils
import { PAGE_PATHS } from 'src/routing/paths';

// ----------------------------------------------------------------------

export default function SidebarFooter() {
  return (
    <Stack spacing={0} sx={{ pb: 3, width: 1, textAlign: 'center', display: 'block' }}>
      <IconButton target="_blank" href="https://www.instagram.com/inssajeon/" rel="noreferrer">
        <InstagramIcon />
      </IconButton>
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

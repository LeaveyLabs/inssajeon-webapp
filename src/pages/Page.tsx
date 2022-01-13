import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';
import LoadingGuard from 'src/guards/LoadingGuard';

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title = '', ...other }, ref) => (
  <LoadingGuard>
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{`인싸전 | ${title}`}</title>
      </Helmet>
      {children}
    </Box>
  </LoadingGuard>

));

export default Page;

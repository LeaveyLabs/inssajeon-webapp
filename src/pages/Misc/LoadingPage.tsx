import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';
//
import ClickableWideLogo from 'src/components/misc/ClickableWideLogo';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

type Props = {
  isDashboard?: boolean;
  sx?: SxProps;
};

export default function LoadingPage({ isDashboard, ...other }: Props) {
  return (
    <>
      <RootStyle>
        <ClickableWideLogo disabledLink sx={{ width: 150}} />
      </RootStyle>
    </>
  );
}

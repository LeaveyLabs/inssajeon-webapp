import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, BoxProps } from '@mui/material';
import { ReactComponent as WideLogoSVG } from 'src/assets/logos/logo-wide.svg'

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function ClickwableWideLogo({ disabledLink = false, sx }: Props) {

  const logo = (
    <Box sx={{ width: 150, height: 30, ...sx }}>
      <WideLogoSVG/>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

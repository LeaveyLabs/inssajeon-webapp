// @mui
import { Box, BoxProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as WideLogoSVG } from 'src/assets/logos/logo-wide.svg';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function ClickwableWideLogoLarge({ disabledLink = false, sx }: Props) {

  const logo = (
    <Box sx={{ width: 180,  ...sx }}>
      <WideLogoSVG/>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

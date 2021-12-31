import { ReactNode, useMemo } from 'react';
// @mui
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
// hooks
//
import componentsOverride from '../../theme/overrides';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function ThemeColorPresets({ children }: Props) {
  const defaultTheme = useTheme();

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
      },
      customShadows: {
        ...defaultTheme.customShadows,
      }
    }),
    [defaultTheme]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

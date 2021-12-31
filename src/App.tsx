// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/app-level/ScrollToTop';
import { ProgressBarStyle } from './components/app-level/ProgressBar';
import ThemeColorPresets from './components/app-level/ThemeColorPresets';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <MotionLazyContainer>
          <GlobalStyles />
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
        </MotionLazyContainer>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}

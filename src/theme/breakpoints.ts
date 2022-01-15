// ----------------------------------------------------------------------
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    tabletSlightlySmaller: true;
    desktop: true;
    fullscreen: true;
  }
}

const breakpoints = {
  values: {
    // xs: 0,
    // sm: 600,
    // md: 900,
    // lg: 1200,
    // xl: 1536
    mobile: 0,
    tabletSlightlySmaller: 500,
    tablet: 600,
    desktop: 1000,
    fullscreen: 1200, //up to 1536 or beyond
  }
};

export default breakpoints;

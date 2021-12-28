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
    tablet: 640,
    desktop: 1000,
    fullscreen: 1536,
  }
};



export default breakpoints;

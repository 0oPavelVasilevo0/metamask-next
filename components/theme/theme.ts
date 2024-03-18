import { createTheme } from "@mui/material";

// declare module '@mui/material/styles' {
//     interface BreakpointOverrides {
//         xs: false; // removes the `xs` breakpoint
//         sm: false;
//         md: false;
//         lg: false;
//         xl: false;
//         mobile: true; // adds the `mobile` breakpoint
//         tablet: true;
//         laptop: true;
//         desktop: true;
//     }
// }

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 660,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});


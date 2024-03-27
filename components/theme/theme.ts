import { createTheme } from "@mui/material";
import { amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow, indigo } from "@mui/material/colors/";


export const customTheme = createTheme({
    breakpoints: {
        values: {
            xs: 340,
            sm: 440,
            md: 700,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: blueGrey,
        secondary: brown,
        success: teal,
        info: brown,
        error: red,
        warning: lime,
    },
});


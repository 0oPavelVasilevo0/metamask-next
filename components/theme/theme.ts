'use client'
import { Theme, createTheme } from "@mui/material";
import {blueGrey, brown, cyan, grey, lime, red, teal, } from "@mui/material/colors/";

export const lightTheme: Theme = createTheme({

    components: {
        MuiButton: {
            variants: [
                {
                    props: (props) =>
                        props.variant === 'text',
                    style: {
                        padding: '6px 16px',
                    },
                },
            ],
            styleOverrides: {
                endIcon: [
                    {
                        margin: '0px -10px 0px -1px',
                    },
                ]
            }
        },
    },

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
        // palette values for light mode
        primary: blueGrey,
        success: teal,
        info: brown,
        error: red,
        warning: lime,
        text: {
            primary: grey[800],
            secondary: grey[500],
        },
        // background: {default: '#fff'}
    }
})

export const darkTheme: Theme = createTheme({
    components: {
        MuiButton: {
            variants: [
                {
                    props: (props) =>
                        props.variant === 'text',
                    style: {
                        padding: '6px 16px',
                    },
                },
            ],
            styleOverrides: {
                endIcon: [
                    {
                        margin: '0px -10px 0px -1px',
                    },
                ]
            }
        },
    },

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
        mode: 'dark',
        // palette values for dark mode
        primary: cyan,
        success: teal,
        info: brown,
        error: red,
        warning: lime,
        background: { default: 'rgb(38, 38, 38)' },
        text: {
            primary: '#fff',
            secondary: grey[200],
        },
    },
},
);

export const customTheme = createTheme(
    {
        breakpoints: {
            values: {
                xs: 340,
                sm: 440,
                md: 700,
                lg: 1200,
                xl: 1536,
            },
        },
    }
);
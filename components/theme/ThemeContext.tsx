import { createContext, useEffect, useState } from "react";
import { IThemeContext, IThemeMode } from "./types";
import { Theme, ThemeProvider, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";

export const ThemeContext = createContext<IThemeContext | null>(null);

export const ThemeContextProvider: React.FunctionComponent<
    React.PropsWithChildren
> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<IThemeMode>(IThemeMode.LIGHT);
    const [theme, setTheme] = useState<Theme>(lightTheme)

    const SYSTEM_THEME: Exclude<IThemeMode, IThemeMode.SYSTEM> = useMediaQuery(" (prefers-color-scheme: dark)")
        ? IThemeMode.DARK : IThemeMode.LIGHT;

    //save in localstorage
    useEffect(() => {
        const themeModeFromPref = _getThemeMode();
        setThemeMode(themeModeFromPref)
    })

    useEffect(() => {
        switch (themeMode) {
            case IThemeMode.LIGHT:
                setTheme(lightTheme);
                break;
            case IThemeMode.DARK:
                setTheme(darkTheme);
                break;
            case IThemeMode.SYSTEM:
                switch (SYSTEM_THEME) {
                    case IThemeMode.LIGHT:
                        setTheme(lightTheme);
                        break;
                    case IThemeMode.DARK:
                        setTheme(darkTheme);
                        break;
                }
                break;
            default:
                setTheme(lightTheme);
                break
        }
    }, [themeMode, SYSTEM_THEME]);

    //save in localstorage
    const _getThemeMode = (): IThemeMode => {
        const themeModeFromPref = localStorage.getItem("themeMode") as IThemeMode;
        if (themeModeFromPref) {
            return themeModeFromPref;
        }
        return IThemeMode.LIGHT
    }
    //save in localstorage
    const _switchThemeMode = (mode: IThemeMode) => {
        localStorage.setItem("themeMode", mode);
    }

    const switchThemeMode = (mode: IThemeMode) => {
        setThemeMode(mode);
        _switchThemeMode(mode);
    }
    return (
        <ThemeContext.Provider
            value={{
                themeMode,
                switchThemeMode
            }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )

}
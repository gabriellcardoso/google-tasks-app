import * as React from 'react';

import {
    MuiTheme,
    MuiThemeProvider,
    getMuiTheme,
} from 'material-ui/styles';

import { amber500 } from 'material-ui/styles/colors';

interface ThemeProviderProps {
    children: React.ReactNode;
}

const theme: MuiTheme = {
    palette: {
        primary1Color: amber500
    }
};

const ThemeProvider = (props: ThemeProviderProps) => (
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        {props.children}
    </MuiThemeProvider>
);

export { ThemeProvider, ThemeProviderProps }
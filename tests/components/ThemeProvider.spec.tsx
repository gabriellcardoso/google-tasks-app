import { shallow, ShallowWrapper } from 'enzyme';
import { MuiThemeProvider } from 'material-ui/styles';
import { amber500 } from 'material-ui/styles/colors';
import * as React from 'react';

import { ThemeProvider, ThemeProviderProps } from '../../src/components/ThemeProvider';

describe('Given a ThemeProvider component', () => {

    let component: ShallowWrapper<ThemeProviderProps>;

    beforeEach(() => {
        component = shallow(<ThemeProvider>Test</ThemeProvider>);
    });

    describe('when rendering', () => {
        it('should have a material theme provider', () => {
            expect(component.find(MuiThemeProvider).exists()).toEqual(true);
        });
        it('should have a material theme', () => {
            expect(component.find(MuiThemeProvider).props().muiTheme.palette.primary1Color).toEqual(amber500);
        });
        it('should have children inside material theme provider', () => {
            expect(component.find(MuiThemeProvider).contains('Test')).toEqual(true);
        });
    });

});
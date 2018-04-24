import { shallow, ShallowWrapper } from 'enzyme';
import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from 'material-ui';
import * as React from 'react';

import { AppBar, AppBarProps } from '../../src/components/AppBar';

describe('Given an AppBar component', () => {

    let onMenuClick = jest.fn();
    let component: ShallowWrapper<AppBarProps>;
    let appBar: ShallowWrapper<MuiAppBarProps>;

    beforeEach(() => {
        onMenuClick.mockClear();
        component = shallow(<AppBar onMenuClick={onMenuClick} />);
    });

    describe('when rendering', () => {
        beforeEach(() => {
            appBar = component.find(MuiAppBar);
        });
        it('should have a material app bar', () => {
            expect(appBar.exists()).toEqual(true);
        });
        it('should have the app bar with correct className', () => {
            expect(appBar.hasClass('app-bar')).toEqual(true);
        });
        it('should have the app bar with the correct title', () => {
            expect(appBar.props().title).toEqual('Tasks App');
        });
        it('should have the app bar showing the menu icon button', () => {
            expect(appBar.props().showMenuIconButton).toEqual(true);
        });
    });

    describe('when clicking on menu icon button', () => {
        it('should call onMenuClick', () => {
            component.find(MuiAppBar).props().onLeftIconButtonClick(null);
            expect(onMenuClick).toHaveBeenCalled();
        });
    });

});
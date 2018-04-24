import { shallow, ShallowWrapper } from 'enzyme';
import MuiMenuItem from 'material-ui/MenuItem';
import * as React from 'react';

import { MenuItem, MenuItemProps } from '../../src/components/MenuItem';

describe('Given a MenuItem component', () => {

    const onClick = jest.fn();
    let component: ShallowWrapper<MenuItemProps>;

    beforeEach(() => {
        onClick.mockClear();
        component = shallow<MenuItemProps>(
            <MenuItem onClick={onClick}>Test</MenuItem>
        );
    });

    describe('when rendering', () => {
        it('should have a material menu item', () => {
            expect(component.find(MuiMenuItem).exists()).toEqual(true);
        });
        it('should have a material menu item with same text', () => {
            expect(component.find(MuiMenuItem).contains('Test')).toEqual(true);
        });
    });

    describe('when clicking', () => {
        beforeEach(() => {
            component.find(MuiMenuItem).simulate('click');
        });
        it('should call on click callback', () => {
            expect(onClick).toHaveBeenCalled();
        });
    });

});
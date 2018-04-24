import { shallow, ShallowWrapper } from 'enzyme';
import { Divider, Drawer, Subheader } from 'material-ui';
import * as React from 'react';

import { Menu, MenuProps } from '../../src/components/Menu';
import { MenuItem } from '../../src/components/MenuItem';
import { TaskList } from '../../src/models/TaskList';

describe('Given a Menu component', () => {

    const taskLists: TaskList[] = [
        { id: '1', title: 'Tasklist 1' },
        { id: '2', title: 'Tasklist 1' },
        { id: '3', title: 'Tasklist 1' },
    ];

    const onSelectList = jest.fn();
    const onCloseMenu = jest.fn();

    const props: MenuProps = {
        open: false,
        taskLists,
        onSelectList,
        onCloseMenu
    };

    let component: ShallowWrapper<MenuProps>;

    beforeEach(() => {
        onSelectList.mockClear();
        onCloseMenu.mockClear();
        component = shallow<MenuProps>(<Menu {...props} />);
    });

    describe('when rendering', () => {
        it('should have a Drawer', () => {
            expect(component.find(Drawer).exists()).toEqual(true);
        });
        it('should have Drawer closed', () => {
            expect(component.find(Drawer).props().open).toEqual(false);
        });
        it('should have Drawer undocked', () => {
            expect(component.find(Drawer).props().docked).toEqual(false);
        });
        it('should have a Subheader', () => {
            expect(component.find(Subheader).exists()).toEqual(true);
        });
        it('should have Subheader text equal Lists', () => {
            expect(component.find(Subheader).contains('Lists')).toEqual(true);
        });
        it('should have a Divider', () => {
            expect(component.find(Divider).exists()).toEqual(true);
        });
        it('should have a menu item for each task', () => {
            expect(component.find(MenuItem)).toHaveLength(3);
        });
        it('should have each menu item with task title', () => {
            taskLists.forEach(
                (taskLists, index) => expect(component.find(MenuItem).get(index).props.children).toEqual(taskLists.title)
            );
        });
    });

    describe('when open changing ', () => {
        beforeEach(() => {
            component.setProps({ open: true });
        })
        it('should open the drawer', () => {
            expect(component.find(Drawer).props().open).toEqual(true);
        });
    });

    describe('when clicking on menu item', () => {
        beforeEach(() => {
            component.find(MenuItem).first().simulate('click');
        });
        it('should call select list callback with selected task id', () => {
            expect(onSelectList).toHaveBeenCalledWith('1');
        });
        it('should call on close menu', () => {
            expect(onCloseMenu).toHaveBeenCalled();
        });
    });

    describe('when closing menu', () => {
        beforeEach(() => {
            component.find(Drawer).props().onRequestChange(false, 'click');
        });
        it('should call close menu callback', () => {
            expect(onCloseMenu).toHaveBeenCalled();
        });
    });

});
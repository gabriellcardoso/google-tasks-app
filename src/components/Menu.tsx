import * as React from 'react';

import {
    Drawer,
    Subheader,
    Divider
} from 'material-ui';

import { MenuItem } from './MenuItem';
import { AddIcon } from './AddIcon';
import { TaskList } from '../models/TaskList';

interface MenuProps {
    open: boolean;
    taskLists: TaskList[];
    onSelectList?: (taskListId: string) => void;
    onCloseMenu: () => void;
}

interface MenuState { }

class Menu extends React.Component<MenuProps, MenuState> {

    render(): React.ReactElement<any> | false {
        const {
            open,
            taskLists,
            onCloseMenu
        } = this.props;

        const taskListItem = taskLists.map(taskList => this.toMenuItem(taskList));

        return (
            <Drawer
                open={open}
                docked={false}
                onRequestChange={onCloseMenu}
            >
                <Subheader>Lists</Subheader>
                <Divider />
                {taskListItem}
            </Drawer>
        );
    }

    private toMenuItem(taskList: TaskList): React.ReactNode {
        return (
            <MenuItem
                key={taskList.id}
                onClick={() => this.handleItemClick(taskList.id)}
            >
                {taskList.title}
            </MenuItem>
        );
    }

    private handleItemClick(taskListId: string) {
        const {
            onSelectList,
            onCloseMenu
        } = this.props;

        onSelectList(taskListId);
        onCloseMenu();
    }

}

export { Menu }
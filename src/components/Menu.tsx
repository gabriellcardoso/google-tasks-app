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
    taskLists: TaskList[];
    open: boolean;
    onSelectList?: (taskListId: string) => void;
}

interface MenuState { }

class Menu extends React.Component<MenuProps, MenuState> {

    render(): React.ReactElement<any> | false {
        const {
            open,
            taskLists
        } = this.props;

        const taskListItem = taskLists.map(taskList => this.toMenuItem(taskList));

        return (
            <Drawer
                open={open}
                docked={false}
            >
                <Subheader>Lists</Subheader>
                <Divider />
                {taskListItem}
            </Drawer>
        );
    }

    private toMenuItem(taskList: TaskList): React.ReactNode {
        return (
            <MenuItem key={taskList.id}>{taskList.title}</MenuItem>
        );
    }

}

export { Menu }
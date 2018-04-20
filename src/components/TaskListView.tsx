import * as React from 'react';

import {
    Paper,
    Subheader,
    Divider,
} from 'material-ui';

import { TaskItem } from './TaskItem';
import { Task } from '../models/Task';
import { TaskList } from '../models/TaskList';

interface TaskListViewProps {
    list: TaskList;
}

interface ListViewState { }

class TaskListView extends React.Component<TaskListViewProps, ListViewState> {

    render(): React.ReactElement<any> | false {
        const { list } = this.props;

        const taskItems = list.tasks.map(this.toTaskItem);

        return (
            <section className="task-list-view">
                <Paper className="container">
                    <Subheader>{list.title}</Subheader>
                    <Divider />
                    {taskItems}
                </Paper>
            </section>
        );
    }

    private toTaskItem(task: Task, index: number): React.ReactNode {
        return (
            <TaskItem
                key={index}
                index={index}
                task={task}
            />
        );
    }

}

export { TaskListView }
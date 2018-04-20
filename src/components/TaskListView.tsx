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
    onAddTask: () => void;
    onUpdateTask: (taskId: number, text: string) => void;
    onToggleTask: (taskId: number) => void;
    onDeleteTask: (taskId: number) => void;
}

interface ListViewState { }

class TaskListView extends React.Component<TaskListViewProps, ListViewState> {

    render(): React.ReactElement<any> | false {
        const { list } = this.props;

        const taskItems = list.tasks.map((task, index) => this.toTaskItem(task, index));

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
        const {
            onAddTask,
            onUpdateTask,
            onToggleTask,
            onDeleteTask
        } = this.props;

        return (
            <TaskItem
                key={task.id}
                task={task}
                onPressEnter={onAddTask}
                onUpdate={onUpdateTask}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
            />
        );
    }

}

export { TaskListView }
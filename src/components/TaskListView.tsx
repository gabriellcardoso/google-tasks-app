import * as React from 'react';

import {
    Paper,
    Subheader,
    Divider,
} from 'material-ui';

import { CircularProgress } from './CircularProgress';
import { TaskItem } from './TaskItem';
import { Task } from '../models/Task';
import { TaskList } from '../models/TaskList';

interface TaskListViewProps {
    isLoading?: boolean;
    list?: TaskList;
    tasks?: Task[];
    onAddTask?: () => void;
    onUpdateTask?: (taskId: string, title: string) => void;
    onToggleTask?: (taskId: string) => void;
    onDeleteTask?: (taskId: string) => void;
}

interface ListViewState {
    text: string
}

class TaskListView extends React.Component<TaskListViewProps, ListViewState> {

    render(): React.ReactElement<any> | false {
        const {
            isLoading,
            list,
            tasks
        } = this.props;

        if (isLoading) {
            return (
                <section className="task-list-view">
                    <CircularProgress />
                </section>
            );
        }

        if (!list || !tasks) {
            return false;
        }

        const taskItems = tasks.map((task, index) => this.toTaskItem(task, index));

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

export { TaskListView, TaskListViewProps }
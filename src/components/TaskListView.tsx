import { Divider, Paper, Subheader } from 'material-ui';
import * as React from 'react';

import { Task } from '../models/Task';
import { TaskList } from '../models/TaskList';
import { CircularProgress } from './CircularProgress';
import { TaskItem } from './TaskItem';

interface TaskListViewProps {
    loading?: boolean;
    list?: TaskList;
    tasks?: Task[];
    onAddTask?: (previousTaskId: string) => void;
    onUpdateTask?: (taskId: string, title: string) => void;
    onToggleTask?: (taskId: string, status: string) => void;
    onDeleteTask?: (taskId: string) => void;
}

interface ListViewState {
    text: string
}

class TaskListView extends React.Component<TaskListViewProps, ListViewState> {

    render(): React.ReactElement<any> | false {
        const {
            loading,
            list,
            tasks
        } = this.props;

        if (loading) {
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
            tasks,
            onAddTask,
            onUpdateTask,
            onToggleTask,
            onDeleteTask
        } = this.props;

        return (
            <TaskItem
                key={task.id}
                task={task}
                onPressEnter={() => onAddTask(task.id)}
                onUpdate={onUpdateTask}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
            />
        );
    }

}

export { TaskListView, TaskListViewProps }
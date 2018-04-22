import * as React from 'react';

import { AppBar } from './AppBar';
import { Menu } from './Menu';
import { TaskListView } from './TaskListView';
import { ActionButton } from './ActionButton';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

interface AppProps {
    taskLists?: TaskList[];
    selected?: TaskList;
    onStart?: () => void;
    onAddTask?: () => void;
    onUpdateTask?: (taskId: number, text: string) => void;
    onToggleTask?: (taskId: number) => void;
    onDeleteTask?: (taskId: number) => void;
}

interface AppState { }

class App extends React.Component<AppProps, AppState> {

    componentWillMount(): void {
        this.props.onStart();
    }

    render(): React.ReactElement<any> | false {
        const {
            taskLists,
            selected,
            onAddTask,
            onUpdateTask,
            onToggleTask,
            onDeleteTask
        } = this.props;

        return (
            <section className="app">
                <AppBar />
                <Menu
                    taskLists={taskLists}
                    open={true}
                />
                <TaskListView
                    list={selected}
                    onAddTask={onAddTask}
                    onUpdateTask={onUpdateTask}
                    onToggleTask={onToggleTask}
                    onDeleteTask={onDeleteTask}
                />
                <ActionButton onClick={onAddTask} />
            </section>
        );
    }

}


export { App, AppProps }
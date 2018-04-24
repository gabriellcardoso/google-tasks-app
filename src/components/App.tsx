import * as React from 'react';

import { AppBar } from './AppBar';
import { LinearProgress } from './LinearProgress';
import { Menu } from './Menu';
import { TaskListViewContainer } from '../containers/TaskListView';
import { ActionButton } from './ActionButton';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

interface AppProps {
    loading?: boolean;
    taskLists?: TaskList[];
    lastTaskId?: string;
    onStart?: () => void;
    onSelectList?: (taskListId: string) => void;
    onAddTask?: (taskListId: string, previousTaskId: string) => void;
}

interface AppState {
    openMenu: boolean;
    taskListId: string;
}

class App extends React.Component<AppProps, AppState> {

    componentWillMount(): void {
        this.start();
    }

    componentWillReceiveProps(nextProps: AppProps): void {
        const {
            taskLists,
            lastTaskId,
            loading
        } = nextProps;

        const notLoading = loading === false;
        const hasTaskLists = taskLists.length;
        const hasntSelectedList = this.state.taskListId === null;

        if (
            notLoading
            && hasTaskLists
            && hasntSelectedList
        ) {
            this.selectList(taskLists[0].id);
        }
    }

    render(): React.ReactElement<any> | false {
        const {
            loading,
            taskLists,
            onSelectList,
            onAddTask,
        } = this.props;

        const {
            openMenu,
            taskListId
        } = this.state;

        if (loading) {
            return (
                <section className="app">
                    <LinearProgress />
                </section>
            );
        }

        return (
            <section className="app">
                <AppBar
                    onMenuClick={() => this.toggleMenu()}
                />
                <Menu
                    taskLists={taskLists}
                    open={openMenu}
                    onCloseMenu={() => this.toggleMenu()}
                    onSelectList={taskListId => this.selectList(taskListId)}
                />
                <TaskListViewContainer taskListId={taskListId} />
                <ActionButton onClick={() => this.addTask()} />
            </section>
        );
    }

    private start(): void {
        const { onStart } = this.props;
        this.setState({ openMenu: false, taskListId: null });
        onStart();
    }

    private toggleMenu(): void {
        this.setState({ openMenu: !this.state.openMenu });
    }

    private selectList(taskListId: string) {
        const { onSelectList } = this.props;
        this.setState({ taskListId });
        onSelectList(taskListId);
    }

    private addTask(): void {
        const { lastTaskId, onAddTask } = this.props;
        const { taskListId } = this.state;
        onAddTask(taskListId, lastTaskId);
    }

}


export { App, AppProps }
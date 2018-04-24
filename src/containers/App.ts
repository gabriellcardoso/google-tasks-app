import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { TaskActions } from '../actions/Task';
import { TaskListActions } from '../actions/TaskList';
import { App, AppProps } from '../components/App';
import { AppState } from '../states/App';

function mapStateToProps(appState: AppState): AppProps {
    const taskLists = appState.taskLists.data;
    const loading = appState.taskLists.fetching;
    const tasks = appState.tasks.data;

    const lastTask = tasks && tasks.length > 0 ?
        tasks[tasks.length - 1] :
        {};

    return {
        loading,
        taskLists,
        lastTaskId: lastTask.id
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): AppProps {
    return {
        onStart(): void {
            const action = TaskListActions.getTaskLists();
            dispatch(action);
        },
        onSelectList(taskListId: string): void {
            const action = TaskActions.getTasks(taskListId);
            dispatch(action);
        },
        onAddTask(taskListId: string, previousTaskId: string): void {
            const action = TaskActions.createTask(taskListId, previousTaskId);
            dispatch(action);
        }
    };
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App as any);

export { AppContainer }
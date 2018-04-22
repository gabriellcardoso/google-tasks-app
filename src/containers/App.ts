import { Dispatch } from "redux";
import { connect } from "react-redux";

import { App, AppProps } from "../components/App";
import { TaskListActions } from "../actions/TaskList";
import { TaskActions } from "../actions/Task";
import { AppState } from "../states/App";
import ApiClient from '../utils/ApiClient';
import { TaskList } from "../models/TaskList";

function mapStateToProps(appState: AppState): AppProps {
    const taskLists = appState.taskLists.data;
    const isLoading = appState.taskLists.isFetching;

    return {
        isLoading,
        taskLists
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): AppProps {
    return {
        onStart(): void {
            const action = TaskListActions.getTaskLists();
            dispatch(action);
        },
        onSelectList(taskListId: string) : void {
            const action = TaskActions.getTasks(taskListId);
            dispatch(action);
        },
        onAddTask(): void {
            const action = TaskActions.createTask();
            dispatch(action);
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App as any);
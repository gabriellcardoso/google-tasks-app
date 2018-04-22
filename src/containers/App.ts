import {
    connect,
    Dispatch
} from "react-redux";

import { App, AppProps } from "../components/App";
import { TaskListActions } from "../actions/TaskList";
import { TaskActions } from "../actions/Task";
import { AppState } from "../states/App";
import ApiClient from '../utils/ApiClient';

function mapStateToProps(state: AppState): AppProps {
    return {
        taskLists: state.taskLists,
        selected: state.selected
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppProps>): AppProps {
    return {
        onStart(): void {
            ApiClient
                .getTasksLists()
                .then(result => {
                    const action = TaskListActions.list(result.items);
                    dispatch(action);
                });
        },
        onAddTask(): void {
            const action = TaskActions.createTask();
            dispatch(action);
        },
        onUpdateTask(taskId: number, text: string): void {
            const action = TaskActions.updateTask(taskId, text);
            dispatch(action);
        },
        onToggleTask(taskId: number): void {
            const action = TaskActions.toggleTask(taskId);
            dispatch(action);
        },
        onDeleteTask(taskId: number): void {
            const action = TaskActions.deleteTask(taskId);
            dispatch(action);
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
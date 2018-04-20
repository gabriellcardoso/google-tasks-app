import {
    connect,
    Dispatch
} from "react-redux";

import { App, AppProps } from "../components/App";
import { TaskActions } from "../actions/TaskActions";
import { AppState } from "../states/App";

function mapStateToProps(state: AppState): AppProps {
    return {
        selected: state.selected
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppProps>): AppProps {
    return {
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
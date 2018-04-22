import { Dispatch } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { ActionType } from "./ActionType";
import { AppState } from "../states/App";
import { Task } from "../models/Task";
import ApiClient from "../utils/ApiClient";

interface TaskAction {
    type: ActionType;
    taskListId?: string;
    tasks?: Task[];
    task?: Task;
    taskId?: string;
    title?: string;
}

class TaskActions {

    static getTasks(taskListId: string): ThunkAction<void, AppState, any> {
        return (dispatch: Dispatch<AppState>) => {
            const action = this.requestTasks();
            dispatch(action);

            const dispatchTasks = (tasks: Task[]) => {
                const action = this.receiveTasks(tasks);
                dispatch(action);
            };

            ApiClient
                .getTasks(taskListId)
                .then(result => result.items)
                .then(dispatchTasks);
        };
    }

    static createTask(taskListId: string, previousTaskId?: string, title?: string): ThunkAction<void, AppState, void> {
        return (dispatch: Dispatch<AppState>) => {
            const action = this.requestCreateTask();
            dispatch(action);

            const dispatchTask = (task: Task) => {
                const action = this.receiveCreateTask(task);
                dispatch(action);
            };

            ApiClient
                .createTask(taskListId, previousTaskId, title)
                .then(dispatchTask);
        };
    }

    static deleteTask(taskListId: string, taskId: string): ThunkAction<void, AppState, void> {
        return (dispatch: Dispatch<AppState>) => {
            const action = this.requestDeleteTask();
            dispatch(action);

            const dispatchTask = () => {
                const action = this.receiveDeleteTask(taskId);
                dispatch(action);
            };

            ApiClient
                .deleteTask(taskListId, taskId)
                .then(dispatchTask);
        };
    }

    static updateTask(taskListId: string, taskId: string, title: string): ThunkAction<void, AppState, void> {
        return (dispatch: Dispatch<AppState>) => {
            const action = this.requestUpdateTask();
            dispatch(action);

            const dispatchTask = (task: Task) => {
                const action = this.receiveUpdateTask(task);
                dispatch(action);
            };

            ApiClient
                .updateTask(taskListId, taskId, title)
                .then(dispatchTask);
        };
    }

    private static requestTasks(): TaskAction {
        return { type: ActionType.RequestTasks };
    }

    private static receiveTasks(tasks: Task[]): TaskAction {
        return { type: ActionType.ReceiveTasks, tasks };
    }

    private static requestCreateTask(): TaskAction {
        return { type: ActionType.RequestCreateTask };
    }

    private static receiveCreateTask(task: Task): TaskAction {
        return { type: ActionType.CreateTask, task };
    }

    private static requestDeleteTask(): TaskAction {
        return { type: ActionType.RequestDeleteTask };
    }

    private static receiveDeleteTask(taskId: string): TaskAction {
        return { type: ActionType.ReceiveDeleteTask, taskId };
    }

    private static requestUpdateTask(): TaskAction {
        return { type: ActionType.RequestUpdateTask };
    }

    private static receiveUpdateTask(task: Task): TaskAction {
        return { type: ActionType.UpdateTask, task };
    }

    static toggleTask(taskId: string): TaskAction {
        return { type: ActionType.ToggleTask, taskId };
    }

}

export {
    TaskAction,
    TaskActions
}
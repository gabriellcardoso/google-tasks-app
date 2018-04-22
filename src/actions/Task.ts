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

    static createTask(taskListId: string, prevTaskId: string, title?: string): ThunkAction<void, AppState, void> {
        return (dispatch: Dispatch<AppState>) => {
            const action = this.requestCreateTask();
            dispatch(action);

            const dispatchTask = (task: Task) => {
                const action = this.receiveCreateTask(task);
                dispatch(action);
            };

            ApiClient
                .createTask(taskListId, prevTaskId, title)
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
        return { type: ActionType.ReceiveCreateTask, task };
    }

    private static requestUpdateTask(): TaskAction {
        return { type: ActionType.RequestUpdateTask };
    }

    private static receiveUpdateTask(task: Task): TaskAction {
        return { type: ActionType.ReceiveUpdateTask, task };
    }

    static toggleTask(taskId: string): TaskAction {
        return { type: ActionType.ToggleTask, taskId };
    }

    static deleteTask(taskId: string): TaskAction {
        return { type: ActionType.DeleteTask, taskId };
    }

}

export {
    TaskAction,
    TaskActions
}
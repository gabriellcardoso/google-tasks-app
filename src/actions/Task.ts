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

    static createTask(taskListId: string): ThunkAction<void, AppState, void> {
        return (dispatch: Dispatch<AppState>) => {
            const action = this.requestCreateTask();
            dispatch(action);

            const dispatchTask = (task: Task) => {
                const action = this.receiveCreateTask(task);
                dispatch(action);
            };

            ApiClient
                .getTasks(taskListId)
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

    static deleteTask(taskId: string): TaskAction {
        return { type: ActionType.DeleteTask, taskId };
    }

    static updateTask(taskId: string, title: string): TaskAction {
        return { type: ActionType.UpdateTask, taskId, title };
    }

    static toggleTask(taskId: string): TaskAction {
        return { type: ActionType.ToggleTask, taskId };
    }

}

export {
    TaskAction,
    TaskActions
}
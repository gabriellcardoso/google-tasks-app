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
    taskId?: string;
    title?: string;
}

class TaskActions {

    static getTasks(taskListId: string): ThunkAction<void, AppState, any> {
        return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
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

    private static requestTasks(): TaskAction {
        return { type: ActionType.RequestTasks };
    }

    private static receiveTasks(tasks: Task[]): TaskAction {
        return { type: ActionType.ReceiveTasks, tasks };
    }

    static createTask(): TaskAction {
        return { type: ActionType.CreateTask };
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
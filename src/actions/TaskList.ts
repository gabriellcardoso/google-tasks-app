import { Dispatch } from "react-redux";
import { ThunkAction } from 'redux-thunk';

import { ActionType } from "./ActionType";
import { AppState } from "../states/App";
import { TaskList } from "../models/TaskList";
import ApiClient from "../utils/ApiClient";

interface TaskListAction {
    type: ActionType;
    taskLists?: TaskList[];
}

class TaskListActions {

    static getTaskLists(): ThunkAction<void, AppState, any> {
        return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
            const action = this.requestTaskList();
            dispatch(action);

            const dispatchTaskLists = (taskLists: TaskList[]) => {
                const action = this.receiveTaskList(taskLists);
                dispatch(action);
            };

            ApiClient
                .getTaskLists()
                .then(result => result.items)
                .then(dispatchTaskLists);
        };
    }

    private static requestTaskList(): TaskListAction {
        return { type: ActionType.RequestTaskLists };
    }

    private static receiveTaskList(taskLists: TaskList[]): TaskListAction {
        return { type: ActionType.ReceiveTaskLists, taskLists };
    }

}

export {
    TaskListAction,
    TaskListActions
}
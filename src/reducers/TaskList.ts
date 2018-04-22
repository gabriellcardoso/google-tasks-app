import { ActionType } from "../actions/ActionType";
import { TaskListAction } from "../actions/TaskList";
import { DataState } from "../states/Data";
import { TaskList } from "../models/TaskList";

class TaskListReducer {

    static reduce(prevState = new DataState<TaskList>(), action: TaskListAction) {
        switch (action.type) {
            case ActionType.RequestTaskLists:
                return {
                    ...prevState,
                    isFetching: true
                };
            case ActionType.ReceiveTaskLists:
                return {
                    ...prevState,
                    isFetching: false,
                    data: action.taskLists
                };
            default:
                return prevState;
        }
    }

}

export { TaskListReducer }
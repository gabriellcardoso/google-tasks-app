import { ActionType } from "../actions/ActionType";
import { TaskListAction } from "../actions/TaskList";
import { DataState } from "../states/Data";
import { TaskList } from "../models/TaskList";

class TaskListReducer {

    static reduce(prevState = new DataState<TaskList>(), action: TaskListAction): DataState<TaskList> {
        switch (action.type) {

            case ActionType.RequestTaskLists:
                return TaskListReducer.setAsFetching(prevState);

            case ActionType.ReceiveTaskLists:
                return TaskListReducer.setData(prevState, action);

            default:
                return prevState;

        }
    }

    private static setAsFetching(prevState: DataState<TaskList>): DataState<TaskList> {
        return {
            ...prevState,
            fetching: true
        };
    }

    private static setData(prevState: DataState<TaskList>, action: TaskListAction): DataState<TaskList> {
        return {
            ...prevState,
            fetching: false,
            data: action.taskLists
        };
    }
    
}

export { TaskListReducer }
import { TaskList } from "../models/TaskList";
import { TaskListAction } from "../actions/TaskList";
import { ActionType } from "../actions/ActionType";

class TaskListReducer {

    static reduce(taskLists: TaskList[] = [], action: TaskListAction) {
        switch (action.type) {
            case ActionType.ListTaskList:
                return action.taskLists;
            default:
                return taskLists;
        }
    }

}

export { TaskListReducer }
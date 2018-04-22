import { ActionType } from "./ActionType";
import { TaskList } from "../models/TaskList";

interface TaskListAction {
    type: ActionType;
    taskLists: TaskList[];
} 

class TaskListActions {

    static list(taskLists: TaskList[]): TaskListAction {
        return { type: ActionType.ListTaskList, taskLists };
    }

}

export {
    TaskListAction,
    TaskListActions
}
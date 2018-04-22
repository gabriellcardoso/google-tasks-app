import { DataState } from "./Data";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

class AppState {
    taskLists: DataState<TaskList>;
    tasks: DataState<Task>;
}

export { AppState }
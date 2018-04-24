import { DataState } from "./Data";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

class AppState {
    taskLists = new DataState<TaskList>();
    tasks = new DataState<Task>();
}

export { AppState }
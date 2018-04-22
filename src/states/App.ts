import { TaskList } from "../models/TaskList";

class AppState {
    taskLists: TaskList[];
    selected: TaskList;
}

export { AppState }
import { Task } from "./Task";

class TaskList {

    title: string;
    tasks: Task[];

    constructor(title: string, tasks: Task[] = []) {
        this.title = title;
        this.tasks = tasks;
    }

}

export { TaskList }
import { Task } from "./Task";

class TaskList {

    title: string;
    tasks: Task[];

    constructor(title = '', tasks: Task[] = [new Task()]) {
        this.title = title;
        this.tasks = tasks;
    }

}

export { TaskList }
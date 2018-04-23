import { TaskList } from "../../models/TaskList";
import { Task } from "../../models/Task";

class ApiClientMock {

    private readonly taskList: TaskList = {
        id: '1',
        title: 'TODO List'
    };

    private readonly task: Task = {
        id: '1',
        title: 'Task 1',
        status: 'needsAction',
        completed: null,
        position: '00001'
    };

    getTasksLists(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve({ items: [this.taskList] });
        });
    }

    getTasks(taskListId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve({ items: [this.task] });
        });
    }

    createTask(taskListId: string, previousTaskId?: string, title?: string): Promise<any> {
        return new Promise<Task>((resolve, reject) => {
            resolve(this.task);
        });
    }

    deleteTask(taskListId: string, taskId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    }

    updateTask(taskListId: string, taskId: string, title: string): Promise<any> {
        return new Promise<Task>((resolve, reject) => {
            resolve(this.task);
        });
    }

    toggleTask(taskListId: string, taskId: string, status: string): Promise<any> {
        return new Promise<Task>((resolve, reject) => {
            resolve(this.task);
        });
    }

}

export default new ApiClientMock();
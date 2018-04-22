import { ActionType } from "./ActionType";

interface TaskAction {
    type: ActionType;
    id?: number;
    text?: string;
}

class TaskActions {

    static createTask(): TaskAction {
        return { type: ActionType.CreateTask };
    }
    
    static deleteTask(id: number): TaskAction {
        return { type: ActionType.DeleteTask, id };
    }

    static updateTask(id: number, text: string): TaskAction {
        return { type: ActionType.UpdateTask, id, text };
    }
    
    static toggleTask(id: number): TaskAction {
        return { type: ActionType.ToggleTask, id };
    }

}

export {
    TaskAction,
    TaskActions
}
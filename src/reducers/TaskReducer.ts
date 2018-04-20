import { ActionType } from "../actions/ActionType";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";
import { TaskAction } from "../actions/TaskActions";

class TaskReducer {

    static reduce(taskList = new TaskList('TODO'), action: TaskAction) {
        switch (action.type) {
            case ActionType.CreateTask:
                return TaskReducer.addTask(taskList);
            case ActionType.DeleteTask:
                return TaskReducer.deleteTask(taskList, action);
            case ActionType.UpdateTask:
                return TaskReducer.updateTask(taskList, action);
            case ActionType.ToggleTask:
                return TaskReducer.toggleTask(taskList, action);
            default:
                return taskList;
        }
    }

    private static addTask(taskList: TaskList): TaskList {
        return new TaskList(
            taskList.title,
            [...taskList.tasks, new Task()]
        );
    }

    private static deleteTask(taskList: TaskList, action: TaskAction): TaskList {
        const tasks = taskList.tasks.filter(task => task.id !== action.id);

        return new TaskList(
            taskList.title,
            tasks.length ? tasks : [new Task()]
        );
    }

    private static updateTask(taskList: TaskList, action: TaskAction): TaskList {
        const updateTaskText = (task: Task) => task.id === action.id ?
            { ...task, text: action.text } :
            task;

        return new TaskList(
            taskList.title,
            taskList.tasks.map(updateTaskText)
        );
    }

    private static toggleTask(taskList: TaskList, action: TaskAction): TaskList {
        const toggleTask = (task: Task) => task.id === action.id ?
            { ...task, completed: !task.completed } :
            task;

        return new TaskList(
            taskList.title,
            taskList.tasks.map(toggleTask)
        );
    }

}

export { TaskReducer }
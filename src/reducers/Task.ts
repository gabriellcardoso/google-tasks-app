import { ActionType } from "../actions/ActionType";
import { TaskAction } from "../actions/Task";
import { Task } from "../models/Task";
import { DataState } from "../states/Data";

class TaskReducer {

    static reduce(prevState = new DataState<Task>(), action: TaskAction): DataState<Task> {
        switch (action.type) {
            case ActionType.RequestTasks:
                return TaskReducer.setAsFetching(prevState);
            case ActionType.ReceiveTasks:
                return TaskReducer.setData(prevState, action);
            case ActionType.CreateTask:
                return TaskReducer.addTask(prevState, action);
            case ActionType.UpdateTask:
                return TaskReducer.updateTask(prevState, action);
            case ActionType.RequestDeleteTask:
                return TaskReducer.setAsDeleting(prevState);
            case ActionType.ReceiveDeleteTask:
                return TaskReducer.deleteTask(prevState, action);
            case ActionType.ToggleTask:
                return TaskReducer.toggleTask(prevState, action);
            default:
                return prevState;
        }
    }

    private static setAsFetching(prevState: DataState<Task>): DataState<Task> {
        return {
            ...prevState,
            isFetching: true
        };
    }

    private static setData(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        return {
            ...prevState,
            data: action.tasks,
            isFetching: false
        };
    }

    private static setAsCreating(prevState: DataState<Task>): DataState<Task> {
        return {
            ...prevState,
            isCreating: true
        };
    }

    private static addTask(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        return {
            ...prevState,
            data: [...prevState.data, action.task],
            isCreating: false
        };
    }

    private static setAsDeleting(prevState: DataState<Task>): DataState<Task> {
        return {
            ...prevState,
            isDeleting: true
        };
    }

    private static deleteTask(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        const tasks = prevState.data.filter(task => task.id !== action.taskId);

        return {
            ...prevState,
            data: tasks.length ? tasks : [{} as Task],
            isDeleting: false
        };
    }

    private static setAsUpdating(prevState: DataState<Task>): DataState<Task> {
        return {
            ...prevState,
            isUpdating: true
        };
    }

    private static updateTask(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        const updateTask = (task: Task) => task.id === action.taskId ?
            action.task :
            task;

        const tasks = prevState.data.map(updateTask);

        return {
            ...prevState,
            data: tasks,
            isUpdating: false
        };
    }

    private static toggleTask(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        const toggleTask = (task: Task) => task.id === action.taskId ?
            {
                ...task,
                status: task.status === 'needsAction' ? 'completed' : 'needsAction'
            } :
            task;

        const tasks = prevState.data.map(toggleTask);

        return {
            ...prevState,
            data: tasks
        };
    }

}

export { TaskReducer }
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

            case ActionType.RequestCreateTask:
                return TaskReducer.setAsCreating(prevState);

            case ActionType.ReceiveCreateTask:
                return TaskReducer.addTask(prevState, action);

            case ActionType.RequestUpdateTask:
                return TaskReducer.setAsUpdating(prevState);

            case ActionType.ReceiveUpdateTask:
                return TaskReducer.updateTask(prevState, action);

            case ActionType.RequestToggleTask:
                return TaskReducer.setAsUpdating(prevState);

            case ActionType.ReceiveToggleTask:
                return TaskReducer.toggleTask(prevState, action);

            case ActionType.RequestDeleteTask:
                return TaskReducer.setAsDeleting(prevState);

            case ActionType.ReceiveDeleteTask:
                return TaskReducer.deleteTask(prevState, action);

            default:
                return prevState;
        }
    }

    private static setAsFetching(prevState: DataState<Task>): DataState<Task> {
        return {
            ...prevState,
            fetching: true
        };
    }

    private static setData(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        return {
            ...prevState,
            data: action.tasks,
            fetching: false
        };
    }

    private static setAsCreating(prevState: DataState<Task>): DataState<Task> {
        return {
            ...prevState,
            creating: true
        };
    }

    private static addTask(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        const tasks = [...prevState.data, action.task].sort((a, b) => a.position.localeCompare(b.position));
        return {
            ...prevState,
            data: tasks,
            creating: false
        };
    }

    private static setAsDeleting(prevState: DataState<Task>): DataState<Task> {
        return {
            ...prevState,
            deleting: true
        };
    }

    private static deleteTask(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        const tasks = prevState.data.filter(task => task.id !== action.taskId);

        return {
            ...prevState,
            data: tasks,
            deleting: false
        };
    }

    private static setAsUpdating(prevState: DataState<Task>): DataState<Task> {
        return {
            ...prevState,
            updating: true
        };
    }

    private static updateTask(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        const updateTask = (task: Task) => task.id === action.task.id ?
            action.task :
            task;

        const tasks = prevState.data.map(updateTask);

        return {
            ...prevState,
            data: tasks,
            updating: false
        };
    }

    private static toggleTask(prevState: DataState<Task>, action: TaskAction): DataState<Task> {
        const updateTask = (task: Task) => task.id === action.task.id ?
            action.task :
            task;

        const tasks = prevState.data.map(updateTask);

        return {
            ...prevState,
            data: tasks,
            updating: false
        };
    }

}

export { TaskReducer }
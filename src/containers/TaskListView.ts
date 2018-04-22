import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TaskListView, TaskListViewProps } from '../components/TaskListView';
import { AppState } from '../states/App';
import { TaskActions } from '../actions/Task';

interface TaskListViewContainerProps {
    id: string;
}

function mapStateToProps(appState: AppState, ownProps: TaskListViewContainerProps): TaskListViewProps {
    const isLoading = appState.tasks.isFetching;
    const tasks = appState.tasks.data;
    const list = appState.taskLists.data.find(taskList => taskList.id === ownProps.id);

    return {
        isLoading, 
        list,
        tasks
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): TaskListViewProps {
    return {
        onAddTask(): void {
            const action = TaskActions.createTask();
            dispatch(action);
        },
        onUpdateTask(taskId: string, title: string): void {
            const action = TaskActions.updateTask(taskId, title);
            dispatch(action);
        },
        onToggleTask(taskId: string): void {
            const action = TaskActions.toggleTask(taskId);
            dispatch(action);
        },
        onDeleteTask(taskId: string): void {
            const action = TaskActions.deleteTask(taskId);
            dispatch(action);
        }
    };
}

const TaskListViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListView as any);

export { TaskListViewContainer }
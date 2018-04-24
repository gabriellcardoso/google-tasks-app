import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TaskListView, TaskListViewProps } from '../components/TaskListView';
import { AppState } from '../states/App';
import { TaskActions } from '../actions/Task';

interface TaskListViewContainerProps {
    taskListId: string;
}

function mapStateToProps(appState: AppState, ownProps: TaskListViewContainerProps): TaskListViewProps {
    const { taskListId } = ownProps;
    
    const loading = appState.tasks.fetching;
    const tasks = appState.tasks.data;
    const list = appState.taskLists.data.find(taskList => taskList.id === taskListId);

    return {
        loading,
        list,
        tasks
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: TaskListViewContainerProps): TaskListViewProps {
    const { taskListId } = ownProps;

    return {
        onAddTask(previousTaskId: string): void {
            const action = TaskActions.createTask(taskListId, previousTaskId);
            dispatch(action);
        },
        onUpdateTask(taskId: string, title: string): void {
            const action = taskId ?
                TaskActions.updateTask(taskListId, taskId, title) :
                TaskActions.createTask(taskListId, null, title);

            dispatch(action);
        },
        onToggleTask(taskId: string, status: string): void {
            const action = TaskActions.toggleTask(taskListId, taskId, status);
            dispatch(action);
        },
        onDeleteTask(taskId: string): void {
            const action = TaskActions.deleteTask(taskListId, taskId);
            dispatch(action);
        }
    };
}

const TaskListViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListView as any);

export { TaskListViewContainer }
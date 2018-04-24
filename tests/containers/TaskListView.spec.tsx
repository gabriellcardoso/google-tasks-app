jest.mock('../../src/actions/Task');
jest.mock('../../src/actions/TaskList');

import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { createMockStore, mockStore } from 'redux-test-utils';

import { TaskListViewProps } from '../../src/components/TaskListView';
import { TaskListViewContainer } from '../../src/containers/TaskListView';
import { Task } from '../../src/models/Task';
import { TaskList } from '../../src/models/TaskList';
import { AppState } from '../../src/states/App';
import { TaskActions } from '../../src/actions/Task';

function shallowWithStore(component: React.ReactElement<any>, store: mockStore<AppState>) {
    const shallowOptions = {
        context: { store }
    };

    return shallow<TaskListViewProps>(component, shallowOptions);
}

describe('Given a TaskListViewContainer', () => {

    const taskList: TaskList[] = [
        { id: '1', title: 'TaskList 1' },
        { id: '3', title: 'TaskList 3' },
        { id: '2', title: 'TaskList 2' },
    ];

    const tasks: Task[] = [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' },
        { id: '3', title: 'Task 3' },
    ];

    let appState: AppState;
    let store: mockStore<AppState>;
    let container: ShallowWrapper<TaskListViewProps>;

    beforeEach(() => {
        appState = new AppState();
        appState.taskLists.fetching = false;
        appState.taskLists.data = taskList;
        appState.tasks.fetching = true;
        appState.tasks.data = tasks;
        store = createMockStore(appState);
        container = shallowWithStore(<TaskListViewContainer taskListId={'3'} />, store);
    });

    describe('when rendering', () => {
        it('should have loading equal to tasks fetching', () => {
            expect(container.props().loading).toEqual(appState.tasks.fetching);
        });
        it('should have list equal to task list from that id', () => {
            expect(container.props().list).toEqual({ id: '3', title: 'TaskList 3' });
        });
        it('should have tasks equal to tasks data', () => {
            expect(container.props().tasks).toEqual(appState.tasks.data);
        });
    });

    describe('when adding task', () => {
        beforeEach(() => {
            container.props().onAddTask('1');
        });
        it('should create create task action to selected task list', () => {
            expect(TaskActions.createTask).toHaveBeenCalledWith('3', '1');
        });
        it('dispatch create task action', () => {
            const action = { type: 'TaskActions.createTask' };
            expect(store.isActionDispatched(action)).toEqual(true);
        });
    });

    describe('when updating task', () => {
        describe('and task exists', () => {
            beforeEach(() => {
                container.props().onUpdateTask('1', 'Task 2');
            });
            it('should create update task action to selected task list and task', () => {
                expect(TaskActions.updateTask).toHaveBeenCalledWith('3', '1', 'Task 2');
            });
            it('dispatch update task action', () => {
                const action = { type: 'TaskActions.updateTask' };
                expect(store.isActionDispatched(action)).toEqual(true);
            });
        });
        describe('and task does not exists', () => {
            beforeEach(() => {
                container.props().onUpdateTask(null, 'Task 1');
            });
            it('should create create task action to selected task list', () => {
                expect(TaskActions.createTask).toHaveBeenCalledWith('3', null, 'Task 1');
            });
            it('dispatch create task action', () => {
                const action = { type: 'TaskActions.createTask' };
                expect(store.isActionDispatched(action)).toEqual(true);
            });
        });
    });

    describe('when toggling task', () => {
        beforeEach(() => {
            container.props().onToggleTask('1', 'completed');
        });
        it('should create toggle task action to selected task list and task', () => {
            expect(TaskActions.toggleTask).toHaveBeenCalledWith('3', '1', 'completed');
        });
        it('dispatch toggle task action', () => {
            const action = { type: 'TaskActions.toggleTask' };
            expect(store.isActionDispatched(action)).toEqual(true);
        });
    });

    describe('when deleting task', () => {
        beforeEach(() => {
            container.props().onDeleteTask('1');
        });
        it('should create delete task action to selected task list and task', () => {
            expect(TaskActions.deleteTask).toHaveBeenCalledWith('3', '1');
        });
        it('dispatch delete task action', () => {
            const action = { type: 'TaskActions.deleteTask' };
            expect(store.isActionDispatched(action)).toEqual(true);
        });
    });

});
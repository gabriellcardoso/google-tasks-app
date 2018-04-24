jest.mock('../../src/actions/TaskList');
jest.mock('../../src/actions/Task');

import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { createMockStore, mockStore } from 'redux-test-utils';

import { TaskActions } from '../../src/actions/Task';
import { TaskListActions } from '../../src/actions/TaskList';
import { AppProps } from '../../src/components/App';
import { AppContainer } from '../../src/containers/App';
import { Task } from '../../src/models/Task';
import { AppState } from '../../src/states/App';

function shallowWithStore(component: React.ReactElement<any>, store: mockStore<AppState>) {
    const shallowOptions = {
        context: { store }
    };

    return shallow<AppProps>(component, shallowOptions);
}

describe('Given an AppContainer', () => {

    const tasks: Task[] = [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' },
    ]

    let appState: AppState;
    let store: mockStore<AppState>;
    let container: ShallowWrapper<AppProps>;

    beforeEach(() => {
        appState = new AppState();
        appState.taskLists.fetching = true;
        appState.tasks.fetching = false;
        appState.tasks.data = tasks;
        store = createMockStore(appState);
        container = shallowWithStore(<AppContainer />, store);
    });

    describe('when rendering', () => {
        describe('and the state contains tasks', () => {
            it('should have loading equal to state fetching', () => {
                expect(container.props().loading).toEqual(appState.taskLists.fetching);
            });
            it('should have task lists equal to tasks lists data', () => {
                expect(container.props().taskLists).toEqual(appState.taskLists.data);
            });
            it('should have task id equal to last task id', () => {
                expect(container.props().lastTaskId).toEqual('2');
            });
        });
        describe('and state does not contain tasks', () => {
            beforeEach(() => {
                appState.tasks.data = [];
                store = createMockStore(appState);
                container = shallowWithStore(<AppContainer />, store);
            });
            it('should have task id equal undefined', () => {
                expect(container.props().lastTaskId).toBeUndefined();
            });
        });
    });

    describe('when calling onStart', () => {
        beforeEach(() => {
            container.props().onStart();
        });
        it('should create get tasks lists action', () => {
            expect(TaskListActions.getTaskLists).toHaveBeenCalled();
        });
        it('should dispatch get tasks lists action', () => {
            const action = { type: 'TaskListActions.getTaskLists' };
            expect(store.isActionDispatched(action)).toEqual(true);
        });
    });

    describe('when calling onSelectList', () => {
        beforeEach(() => {
            container.props().onSelectList('123');
        });
        it('should create get tasks action', () => {
            expect(TaskActions.getTasks).toHaveBeenCalledWith('123');
        });
        it('should dispatch get tasks action', () => {
            const action = { type: 'TaskActions.getTasks' };
            expect(store.isActionDispatched(action)).toEqual(true);
        });
    });

    describe('when calling onAddTask', () => {
        beforeEach(() => {
            container.props().onAddTask('123', '234');
        });
        it('should create get tasks action', () => {
            expect(TaskActions.createTask).toHaveBeenCalledWith('123', '234');
        });
        it('should dispatch get tasks action', () => {
            const action = { type: 'TaskActions.createTask' };
            expect(store.isActionDispatched(action)).toEqual(true);
        });
    });

});
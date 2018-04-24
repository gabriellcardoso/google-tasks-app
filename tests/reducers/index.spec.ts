jest.mock('../../src/reducers/Task');
jest.mock('../../src/reducers/TaskList');

import { createStore } from 'redux';

import { ActionType } from '../../src/actions/ActionType';
import { Task } from '../../src/models/Task';
import { TaskList } from '../../src/models/TaskList';
import { reducers } from '../../src/reducers';
import { TaskReducer } from '../../src/reducers/Task';
import { TaskListReducer } from '../../src/reducers/TaskList';
import { DataState } from '../../src/states/Data';

describe('Given application reducers', () => {

    const store = createStore(reducers);
    const tasksListsState = new DataState<TaskList>();
    const tasksState = new DataState<Task>();
    const action = { type: ActionType.ReceiveCreateTask };

    describe('when receiving an action', () => {
        beforeEach(() => {
            store.dispatch(action);
        })
        it('should call TaskListReducer reduce with correct state', () => {
            expect(TaskListReducer.reduce).toHaveBeenCalledWith(tasksListsState, action);
        });
        it('should call TaskReducer reduce with correct state', () => {
            expect(TaskReducer.reduce).toHaveBeenCalledWith(tasksState, action);
        });
    });

});
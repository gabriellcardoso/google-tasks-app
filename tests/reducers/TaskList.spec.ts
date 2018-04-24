import { ActionType } from '../../src/actions/ActionType';
import { TaskListReducer } from '../../src/reducers/TaskList';
import { DataState } from '../../src/states/Data';
import { TaskListAction } from '../../src/actions/TaskList';
import { TaskList } from '../../src/models/TaskList';

describe('Given a TaskListReducer', () => {

    const taskLists: TaskList[] = [
        { id: '1', title: 'TODO List' }
    ];

    let previousState: DataState<TaskList>;
    let nextState: DataState<TaskList>;
    let action: TaskListAction;

    beforeEach(() => {
        previousState = new DataState<TaskList>();
    });

    describe('when reducing a RequestTaskLists action', () => {
        beforeEach(() => {
            previousState.fetching = false;
            action = { type: ActionType.RequestTaskLists };
            nextState = TaskListReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with fetching as true', () => {
            expect(nextState.fetching).toEqual(true);
        });
    });

    describe('when reducing a ReceiveTaskLists action', () => {
        beforeEach(() => {
            previousState.fetching = true;
            previousState.data = [];
            action = { type: ActionType.ReceiveTaskLists, taskLists };
            nextState = TaskListReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with fetching as false', () => {
            expect(nextState.fetching).toEqual(false);
        });
        it('should return a state with data equal to action task lists', () => {
            expect(nextState.data).toEqual(taskLists);
        });
    });

    describe('when reducing any other action', () => {
        beforeEach(() => {
            action = { type: ActionType.RequestTasks };
            nextState = TaskListReducer.reduce(previousState, action);
        });
        it('should return previous state', () => {
            expect(nextState).toBe(previousState);
        });
    });

});
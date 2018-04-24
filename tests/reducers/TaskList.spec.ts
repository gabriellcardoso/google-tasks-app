import { ActionType } from '../../src/actions/ActionType';
import { TaskListReducer } from '../../src/reducers/TaskList';
import { DataState } from '../../src/states/Data';
import { TaskListAction } from '../../src/actions/TaskList';
import { TaskList } from '../../src/models/TaskList';

describe('Given a TaskListReducer', () => {

    beforeEach(() => {
        this.previousState = new DataState<TaskList>();
    });

    describe('when reducing a RequestTaskLists action', () => {
        beforeEach(() => {
            this.previousState.fetching = false;
            this.action = { type: ActionType.RequestTaskLists };
            this.nextState = TaskListReducer.reduce(this.previousState, this.action);
        });
        it('should return a new state', () => {
            expect(this.nextState).not.toBe(this.previousState);
        });
        it('should have fetching as true', () => {
            expect(this.nextState.fetching).toEqual(true);
        });
    });

    describe('when reducing a ReceiveTaskLists action', () => {
        beforeEach(() => {
            this.previousState.fetching = true;
            this.previousState.data = [];
            this.taskLists = [{ id: '1', title: 'TODO List'}] as TaskList[];
            this.action = { type: ActionType.ReceiveTaskLists, taskLists: this.taskLists };
            this.nextState = TaskListReducer.reduce(this.previousState, this.action);
        });
        it('should return a new state', () => {
            expect(this.nextState).not.toBe(this.previousState);
        });
        it('should have fetching as false', () => {
            expect(this.nextState.fetching).toEqual(false);
        });
        it('should have data equal to action task lists', () => {
            expect(this.nextState.data).toEqual(this.taskLists);
        });
    });

    describe('when reducing any other action', () => {
        beforeEach(() => {
            this.action = { type: ActionType.RequestTasks };
            this.nextState = TaskListReducer.reduce(this.previousState, this.action);
        });
        it('should return previous state', () => {
            expect(this.nextState).toBe(this.previousState);
        });
    });

});
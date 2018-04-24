import { ActionType } from '../../src/actions/ActionType';
import { TaskAction } from '../../src/actions/Task';
import { Task } from '../../src/models/Task';
import { TaskReducer } from '../../src/reducers/Task';
import { DataState } from '../../src/states/Data';

describe('Given a TaskReducer', () => {

    const oneTask: Task = {
        id: '1',
        title: 'Task 1',
        status: 'needsAction',
        completed: '',
        position: '00001'
    };
    const anotherTask: Task = {
        id: '2',
        title: 'Task 2',
        status: 'needsAction',
        completed: '',
        position: '00002'
    };
    const tasks = [oneTask];

    let previousState: DataState<Task>;
    let nextState: DataState<Task>;
    let modifiedTask: Task;
    let action: TaskAction;

    beforeEach(() => {
        previousState = new DataState<Task>();
    });

    describe('when reducing a RequestTasks action', () => {
        beforeEach(() => {
            previousState.fetching = false;
            action = { type: ActionType.RequestTasks };
            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with fetching as true', () => {
            expect(nextState.fetching).toEqual(true);
        });
    });

    describe('when reducing a ReceiveTasks action ', () => {
        beforeEach(() => {
            previousState.fetching = true;
            previousState.data = [];
            
            action = {
                type: ActionType.ReceiveTasks,
                tasks
            };

            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with fetching as false', () => {
            expect(nextState.fetching).toEqual(false);
        });
        it('should return a state with data equal to action tasks', () => {
            expect(nextState.data).toEqual(tasks);
        });
    });

    describe('when reducing RequestCreateTask action', () => {
        beforeEach(() => {
            previousState.creating = false;
            action = { type: ActionType.RequestCreateTask };
            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with creating as true', () => {
            expect(nextState.creating).toEqual(true);
        });
    });

    describe('when reducing ReceiveCreateTask action', () => {
        beforeEach(() => {
            previousState.creating = true;
            previousState.data = tasks;

            action = {
                type: ActionType.ReceiveCreateTask,
                task: anotherTask
            };

            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with creating as false', () => {
            expect(nextState.creating).toEqual(false);
        });
        it('should return a state with data equal to previous state more action task', () => {
            expect(nextState.data).toEqual([...previousState.data, anotherTask]);
        });
    });

    describe('when reducing RequestUpdateTask action', () => {
        beforeEach(() => {
            previousState.updating = false;
            action = { type: ActionType.RequestUpdateTask };
            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with updating as true', () => {
            expect(nextState.updating).toEqual(true);
        });
    });

    describe('when reducing ReceiveUpdateTask action', () => {
        beforeEach(() => {
            previousState.updating = true;
            previousState.data = tasks;
            
            modifiedTask = {
                ...oneTask,
                title: 'Task 3'
            };

            action = {
                type: ActionType.ReceiveUpdateTask,
                task: modifiedTask
            };

            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with updating as false', () => {
            expect(nextState.updating).toEqual(false);
        });
        it('should return a state with data updated with action task', () => {
            expect(nextState.data).toEqual([modifiedTask]);
        });
    });

    describe('when reducing RequestToggleTask action', () => {
        beforeEach(() => {
            previousState.updating = false;
            action = { type: ActionType.RequestToggleTask };
            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with updating as true', () => {
            expect(nextState.updating).toEqual(true);
        });
    });

    describe('when reducing ReceiveToggleTask action', () => {
        beforeEach(() => {
            previousState.updating = true;
            previousState.data = tasks;

            modifiedTask = {
                ...oneTask,
                status: 'completed',
                completed: '2018-04-24'
            };

            action = {
                type: ActionType.ReceiveToggleTask,
                task: modifiedTask
            };

            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with updating as false', () => {
            expect(nextState.updating).toEqual(false);
        });
        it('should return a state with data updated with action task', () => {
            expect(nextState.data).toEqual([modifiedTask]);
        });
    });

    describe('when reducing RequestDeleteTask action', () => {
        beforeEach(() => {
            previousState.deleting = false;
            action = { type: ActionType.RequestDeleteTask };
            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with deleting as true', () => {
            expect(nextState.deleting).toEqual(true);
        });
    });

    describe('when reducing ReceiveDeleteTask action', () => {
        beforeEach(() => {
            previousState.deleting = true;
            previousState.data = tasks;
            action = { type: ActionType.ReceiveDeleteTask, taskId: '1' };
            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return a new state', () => {
            expect(nextState).not.toBe(previousState);
        });
        it('should return a state with deleting as false', () => {
            expect(nextState.deleting).toEqual(false);
        });
        it('should return a state with data without the deleted task', () => {
            expect(nextState.data).toEqual([]);
        });
    });

    describe('when reducing any other action', () => {
        beforeEach(() => {
            action = { type: ActionType.RequestTaskLists };
            nextState = TaskReducer.reduce(previousState, action);
        });
        it('should return previous state', () => {
            expect(nextState).toBe(previousState);
        });
    });

});

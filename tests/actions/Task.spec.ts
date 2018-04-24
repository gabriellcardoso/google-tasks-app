jest.mock('../../src/utils/ApiClient');

import { ThunkAction } from 'redux-thunk';

import { ActionType } from '../../src/actions/ActionType';
import { TaskActions } from '../../src/actions/Task';
import { Task } from '../../src/models/Task';
import { AppState } from '../../src/states/App';
import ApiClient from '../../src/utils/ApiClient';

describe('Given a TaskActions', () => {

    const dispatch = jest.fn();

    const task: Task = {
        id: '1',
        title: 'Task 1',
        status: 'needsAction',
        completed: null,
        position: '00001'
    };

    let thunkAction: ThunkAction<void, AppState, any>;

    beforeEach(() => {
        dispatch.mockClear();
    });

    describe('when getting tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'getTasks');
            thunkAction = TaskActions.getTasks('1');
            thunkAction(dispatch, null, null);
        });
        it('should dispatch RequestTasks action', () => {
            expect(dispatch).toHaveBeenCalledWith({ type: ActionType.RequestTasks });
        });
        it('should request to get all tasks from a task list', () => {
            expect(ApiClient.getTasks).toHaveBeenCalledWith('1');
        });
        it('should dispatch ReceiveTasks action', () => {
            expect(dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveTasks,
                tasks: [task]
            });
        });
    });

    describe('when creating tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'createTask');
            thunkAction = TaskActions.createTask('1', '2', 'Task 1');
            thunkAction(dispatch, null, null);
        });
        it('should dispatch RequestCreateTask action', () => {
            expect(dispatch).toHaveBeenCalledWith({ type: ActionType.RequestCreateTask });
        });
        it('should request to create a task for a task list', () => {
            expect(ApiClient.createTask).toHaveBeenCalledWith('1', '2', 'Task 1');
        });
        it('should dispatch ReceiveCreateTask action', () => {
            expect(dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveCreateTask,
                task: task
            });
        });
    });

    describe('when updating tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'updateTask');
            thunkAction = TaskActions.updateTask('1', '2', 'Task 1');
            thunkAction(dispatch, null, null);
        });
        it('should dispatch RequestUpdateTask action', () => {
            expect(dispatch).toHaveBeenCalledWith({ type: ActionType.RequestUpdateTask });
        });
        it('should request to update a task from a task list', () => {
            expect(ApiClient.updateTask).toHaveBeenCalledWith('1', '2', 'Task 1');
        });
        it('should dispatch ReceiveUpdateTask action', () => {
            expect(dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveUpdateTask,
                task: task
            });
        });
    });

    describe('when toggling tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'toggleTask');
            thunkAction = TaskActions.toggleTask('1', '2', 'completed');
            thunkAction(dispatch, null, null);
        });
        it('should dispatch RequestToggleTask action', () => {
            expect(dispatch).toHaveBeenCalledWith({ type: ActionType.RequestToggleTask });
        });
        it('should request to update a task from a task list', () => {
            expect(ApiClient.toggleTask).toHaveBeenCalledWith('1', '2', 'completed');
        });
        it('should dispatch ReceiveToggleTask action', () => {
            expect(dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveToggleTask,
                task: task
            });
        });
    });

    describe('when deleting tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'deleteTask');
            thunkAction = TaskActions.deleteTask('1', '2');
            thunkAction(dispatch, null, null);
        });
        it('should dispatch RequestDeleteTask action', () => {
            expect(dispatch).toHaveBeenCalledWith({ type: ActionType.RequestDeleteTask });
        });
        it('should request to update a task from a task list', () => {
            expect(ApiClient.deleteTask).toHaveBeenCalledWith('1', '2');
        });
        it('should dispatch ReceiveDeleteTask action', () => {
            expect(dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveDeleteTask,
                taskId: '2'
            });
        });
    });

});
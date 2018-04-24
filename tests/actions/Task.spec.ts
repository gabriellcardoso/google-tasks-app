jest.mock('../../src/utils/ApiClient');

import ApiClient from '../../src/utils/ApiClient';
import { TaskActions } from '../../src/actions/Task';
import { ActionType } from '../../src/actions/ActionType';

describe('Given a TaskActions', () => {

    beforeEach(() => {
        this.task = {
            id: '1',
            title: 'Task 1',
            status: 'needsAction',
            completed: null,
            position: '00001'
        };
        this.dispatch = jest.fn();
    });

    describe('when getting tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'getTasks');
            this.action = TaskActions.getTasks('1');
            this.action(this.dispatch);
        });
        it('should dispatch RequestTasks action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({ type: ActionType.RequestTasks });
        });
        it('should request to get all tasks from a task list', () => {
            expect(ApiClient.getTasks).toHaveBeenCalledWith('1');
        });
        it('should dispatch ReceiveTasks action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveTasks,
                tasks: [this.task]
            });
        });
    });

    describe('when creating tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'createTask');
            this.action = TaskActions.createTask('1', '2', 'Task 1');
            this.action(this.dispatch);
        });
        it('should dispatch RequestCreateTask action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({ type: ActionType.RequestCreateTask });
        });
        it('should request to create a task for a task list', () => {
            expect(ApiClient.createTask).toHaveBeenCalledWith('1', '2', 'Task 1');
        });
        it('should dispatch ReceiveCreateTask action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveCreateTask,
                task: this.task
            });
        });
    });

    describe('when updating tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'updateTask');
            this.action = TaskActions.updateTask('1', '2', 'Task 1');
            this.action(this.dispatch);
        });
        it('should dispatch RequestUpdateTask action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({ type: ActionType.RequestUpdateTask });
        });
        it('should request to update a task from a task list', () => {
            expect(ApiClient.updateTask).toHaveBeenCalledWith('1', '2', 'Task 1');
        });
        it('should dispatch ReceiveUpdateTask action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveUpdateTask,
                task: this.task
            });
        });
    });

    describe('when toggling tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'toggleTask');
            this.action = TaskActions.toggleTask('1', '2', 'completed');
            this.action(this.dispatch);
        });
        it('should dispatch RequestToggleTask action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({ type: ActionType.RequestToggleTask });
        });
        it('should request to update a task from a task list', () => {
            expect(ApiClient.toggleTask).toHaveBeenCalledWith('1', '2', 'completed');
        });
        it('should dispatch ReceiveToggleTask action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveToggleTask,
                task: this.task
            });
        });
    });

    describe('when deleting tasks', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'deleteTask');
            this.action = TaskActions.deleteTask('1', '2');
            this.action(this.dispatch);
        });
        it('should dispatch RequestDeleteTask action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({ type: ActionType.RequestDeleteTask });
        });
        it('should request to update a task from a task list', () => {
            expect(ApiClient.deleteTask).toHaveBeenCalledWith('1', '2');
        });
        it('should dispatch ReceiveDeleteTask action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveDeleteTask,
                taskId: '2'
            });
        });
    });

});